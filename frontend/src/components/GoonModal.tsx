import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Stack, 
    Chip,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/Favorite';
import Favorite from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import '../css/TagPills.css'
import { useUserContext } from '../services/UserContext';
import { useReportChange } from '../services/ReportChange';
import { addFavorite, addTag, deleteFavorite } from '../services/FastAPI-backend';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getFavoritePostIds } from '../services/FastAPI-backend';

function GoonModal(props: { 
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    indexSelected: number, 
    setIndexSelected: React.Dispatch<React.SetStateAction<number>>, 
    goonInformation: any, 
    setGoonInformation: React.Dispatch<React.SetStateAction<any>>,
    goons: any[]
}) {

    const report = useReportChange()
    const user = useUserContext()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showExtraTags, setShowExtraTags] = useState(false);
    const [favoritePostIds, setFavoritePostIds] = useState<number[]>([])

// when the form is submitted, determine what to do with the input value
    async function handleSubmit(tag: string, userID: number) {
        const formData = {
            tag: tag,
            userID: userID
        }
        // handle form submission here - disable submit button and make API call
        setIsSubmitting(true)
        const dataString = JSON.stringify(formData);
        const apiResponse = await addTag(dataString);

        // unsuccessful API response returns an error toast
        // successful API response returns a success toast and resets form data
        if (!apiResponse) {
            toast.error('Failed to submit tag to the backend. Please try again.');
            setIsSubmitting(false)
            return;
        } else {
            toast.success(`Tag "${formData.tag}" submitted successfully.`);
            setIsSubmitting(false)
            report.setReportChanged(true);
        }
    }

    async function handleFavorite(checked: boolean) {
        const formData = {
            userID: user.userID,
            goonInformation: props.goonInformation
        }
        if (checked) {
            setIsSubmitting(true)
            setFavoritePostIds([...favoritePostIds, props.goonInformation.id])
            const apiResponse = await addFavorite(JSON.stringify(formData))
            if (!apiResponse) {
                toast.error('Failed to add favorite.');
                setIsSubmitting(false)
            } else {
                await apiResponse.json()
                toast.success('Favorite added!');
                setIsSubmitting(false)
            }
        
        } else if (!checked) {
            setIsSubmitting(true)
            setFavoritePostIds(favoritePostIds.filter(id => id !== props.goonInformation.id))
            if (favoritePostIds.length === 0) setFavoritePostIds([-1])
            const response = await deleteFavorite(JSON.stringify(formData))
            if (!response) {
                toast.error('Failed to add favorite.');
                setIsSubmitting(false)
            } else {
                toast.success('Favorite deleted.');
                setIsSubmitting(false)
            }
        }
    }

    async function fetchFavoritePostIds() {
        const response = await getFavoritePostIds(user.userID);
        if (!response) return;
        let jsonData = await response.json();
        if (jsonData.length === 0) jsonData = [-1]
        setFavoritePostIds(jsonData);
    }
    
    function findArtist(goonInformation: any) {
        const artistTags = goonInformation["tag_info"].filter((tag: any) => tag.type === 'artist');
        if (artistTags.length > 0) {
            return artistTags.map((tag: any) => tag.tag).join(', ');
        } else {
            return 'no artist attached to this post';
        }
    }

    useEffect(() => {
        fetchFavoritePostIds()
    }, [])

    return (
        <>
        <Dialog open={props.open} onClose={() => {props.setOpen(false)}}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr' }}>
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', gridColumn: '2' }}>
                    {`Artist: ${
                        findArtist(props.goonInformation)}`
                    }
                </DialogTitle>
                {favoritePostIds.length > 0 && (
                    <FormControlLabel 
                    label={favoritePostIds.includes(props.goonInformation.id) ? "Favorited" : "Favorite"}
                    labelPlacement='bottom'
                    sx={{ gridColumn: '3', alignItems: 'end'}}
                    control={ 
                        <Checkbox 
                            size="large"
                            icon={<FavoriteBorder sx={{ backgroundColor: 'transparent' }} />}
                            disabled={isSubmitting}
                            checkedIcon={<Favorite />}
                            checked={favoritePostIds.includes(props.goonInformation.id)}
                            onChange={(e) => {
                                handleFavorite(e.target.checked)
                            }} 
                        />
                    } 
                />
                )}
            </div>
            <Button
                variant='contained'
                sx={{ backgroundColor: '#313030', margin: '0 auto' }}
                style={{ color: 'white' }}
                onClick={() => {
                    setShowExtraTags(!showExtraTags);
                }}
            >Show tags</Button>

            {showExtraTags && (
                <Dialog open={showExtraTags} onClose={() => {setShowExtraTags(false)}} style={{ textAlign: 'center', fontWeight: 'bold'  }}>
                    <DialogContent style={{ textAlign: 'center', fontWeight: 'bold'  }}>
                        <div className="tag-pills">
                            <p style={{ display: "inline-block", margin: '3px 0' }}>This will only display tags that are not currently stored under your name.</p>
                            <p style={{ display: "inline-block", margin: '3px 0' }}>Tap on a tag to add it to your currently stored tags list.</p>
                            <p style={{ display: "inline-block", margin: '3px 0' }}>Tap anywhere outside of this modal to exit this view.</p>
                            {props.goonInformation["tag_info"].map((tag: any, index: number) => (
                                <>
                                    <Stack key={index} 
                                        spacing={1} 
                                        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', flexBasis: '30%',
                                            '& .MuiChip-label': {
                                            fontSize: '22px'
                                        } 
                                        }}>
                                        <Chip 
                                            key={index}
                                            disabled={isSubmitting}
                                            onClick={() => {
                                                handleSubmit(tag.tag, user.userID)
                                            }} 
                                            label={tag.tag}
                                            color="primary" 
                                            variant="filled" 
                                        />
                                    </Stack>
                                </>
                        ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <DialogContent style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                <a href={props.goonInformation["file_url"]} target="_blank" rel="noopener noreferrer">
                    <img className="goon-modal-img" src={props.goonInformation["sample_url"]} alt={`Goon ${props.indexSelected + 1}`} />
                </a>
            </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant='contained'
                        sx={{  backgroundColor: '#313030', marginBottom: '20px' }}
                        style={{ color: 'white' }}
                        disabled={props.indexSelected <= 0}
                        onClick={() => {
                            props.setIndexSelected(props.indexSelected - 1);
                            props.setGoonInformation(props.goons[props.indexSelected - 1]);
                        }}
                        >Previous Goon</Button>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: '#313030', marginBottom: '20px' }}
                        style={{ color: 'white' }}
                        disabled={props.indexSelected >= props.goons.length - 1}
                        onClick={() => {
                            props.setIndexSelected(props.indexSelected + 1);
                            props.setGoonInformation(props.goons[props.indexSelected + 1]);
                        }}
                        >Next Goon</Button>
                </DialogActions>
        </Dialog>
        <ToastContainer 
            position="top-center" 
            autoClose={5000}
        />
        </>
    );
}

export default GoonModal;