import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Stack, 
    Chip 
} from '@mui/material';
import { useState } from 'react';
import '../css/TagPills.css'
import { useUserContext } from '../services/UserContext';
import { useReportChange } from '../services/ReportChange';
import { addTag } from '../services/FastAPI-backend';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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

    function findArtist(goonInformation: any) {
        const artistTags = goonInformation["tag_info"].filter((tag: any) => tag.type === 'artist');
        if (artistTags.length > 0) {
            return artistTags.map((tag: any) => tag.tag).join(', ');
        } else {
            return 'no artist attached to this post';
        }
    }

    const [showExtraTags, setShowExtraTags] = useState(false);
    return (
        <>
        <Dialog open={props.open} onClose={() => {props.setOpen(false)}}>
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold'  }}>
                {`Artist: ${
                    findArtist(props.goonInformation)}`
                }
            </DialogTitle>
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
                                                // setTagToSubmit({...tagToSubmit, tag: tag.tag, userID: user.userID})
                                                handleSubmit(tag.tag, user.userID)
                                            }} 
                                            label={tag.tag}
                                            color="primary" 
                                            variant="filled" />
                                    </Stack>
                                </>
                        ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <DialogContent style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                <a href={props.goonInformation["file_url"]} target="_blank" rel="noopener noreferrer">
                    <img className="goon-modal-img" src={props.goonInformation["file_url"]} alt={`Goon ${props.indexSelected + 1}`} />
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
                        disabled={props.indexSelected >= 29}
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