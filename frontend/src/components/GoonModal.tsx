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

function GoonModal(props: { 
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    indexSelected: number, 
    setIndexSelected: React.Dispatch<React.SetStateAction<number>>, 
    goonInformation: any, 
    setGoonInformation: React.Dispatch<React.SetStateAction<any>>,
    goons: any[]
}) {

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
                            {props.goonInformation["tag_info"].map((tag: any, index: number) => (
                            // <p style={{ display: "inline" }}key={index}>{tag.tag}{index === props.goonInformation["tag_info"].length - 1 ? '' : ', '}</p>
                                <Stack key={index} 
                                    spacing={1} 
                                    sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', 
                                        '& .MuiChip-label': {
                                        fontSize: '22px'
                                    } 
                                    }}>
                                    <Chip 
                                        key={index} 
                                        label={tag.tag}
                                        color="primary" 
                                        variant="outlined" />
                                </Stack>
                        ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <DialogContent style={{ overflow: 'hidden' }}>
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
                        disabled={props.indexSelected >= 14}
                        onClick={() => {
                            props.setIndexSelected(props.indexSelected + 1);
                            props.setGoonInformation(props.goons[props.indexSelected + 1]);
                            }}
                        >Next Goon</Button>
                </DialogActions>
        </Dialog>
    );
}

export default GoonModal;