import {
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import '../css/GoonCards.css';
import '../css/CenterItems.css';

function GoonCards({ goons }: { goons: any[] }) {
    // Uses Material UIs Grid and Card components to display cards in a responsive layout (xs, s and md control what happens at certain screen sizes)
    // xs: extra small screens
    // sm: small screens
    // md: medium screens
    const [open, setOpen] = useState(false);
    const [indexSelected, setIndexSelected] = useState(-1)
    const [goonInformation, setGoonInformation] = useState({"file_url": "not set yet"})
    return (
        <>
        <Grid container spacing={2}>
            {/* Easiest way to read this: for each goon in the returned goons array, create a figure element with an image and caption */}
            {/* "goon: any[]" is each individual goon in the goons array, and index is the iterator (which position in the array are we at rn) */}
                {goons.map((goon: any, index: number) => (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 2 }}>
                        <Card className="goon-card" sx={{ backgroundColor: '#313030' }}>
                            <CardActionArea 
                                onClick={() => {
                                    setOpen(true);
                                    setIndexSelected(index)
                                    setGoonInformation(goons[index])}}
                                >
                                <CardContent>
                                    <img src={goon["file_url"]} alt={`Goon ${index + 1}`} />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={() => {setOpen(false)}}>
                <DialogTitle style={{ textAlign: 'center' }}>
                    {`Goon ${indexSelected + 1}`}
                </DialogTitle>
                <DialogContent style={{ overflow: 'hidden' }}>
                    <a href={goonInformation["file_url"]} target="_blank" rel="noopener noreferrer">
                        <img className="goon-modal-img" src={goonInformation["file_url"]} alt={`Goon ${indexSelected + 1}`} />
                    </a>
                </DialogContent>
                    <DialogActions>
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: '#313030', marginBottom: '20px' }}
                            style={{ color: 'white'}}
                            disabled={indexSelected <= 0}
                            onClick={() => {
                                setIndexSelected(indexSelected - 1);
                                setGoonInformation(goons[indexSelected - 1]);
                                }}
                            >Previous Goon</Button>
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: '#313030', marginBottom: '20px' }}
                            style={{ color: 'white'}}
                            disabled={indexSelected >= 14}
                            onClick={() => {
                                setIndexSelected(indexSelected + 1);
                                setGoonInformation(goons[indexSelected + 1]);
                                }}
                            >Next Goon</Button>
                    </DialogActions>
            </Dialog>
        </>
    );
}

export default GoonCards;