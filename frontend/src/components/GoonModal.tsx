import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function GoonModal(props: { 
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    indexSelected: number, 
    setIndexSelected: React.Dispatch<React.SetStateAction<number>>, 
    goonInformation: any, 
    setGoonInformation: React.Dispatch<React.SetStateAction<any>>,
    goons: any[]
}) {
    return (
        <Dialog open={props.open} onClose={() => {props.setOpen(false)}}>
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold'  }}>
                {`Artist: ${props.goonInformation["tag_info"].length > 0 ? props.goonInformation["tag_info"][0]["tag"] : "no artist attached to post"}`}
            </DialogTitle>
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