import {
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle
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
    const [goonInformation, setGoonInformation] = useState({"@file_url": "not set yet"})

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
                                    <img src={goon["@file_url"]} alt={`Goon ${index + 1}`} />
                                    {/* <a href={goon["@file_url"]} target="_blank" rel="noopener noreferrer">
                                        <img src={goon["@file_url"]} alt={`Goon ${index + 1}`} />
                                    </a> */}
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
                    <a href={goonInformation["@file_url"]} target="_blank" rel="noopener noreferrer">
                        <img style={{ objectFit: 'contain', width: '100%', height: '100%' }} src={goonInformation["@file_url"]} alt={`Goon ${indexSelected + 1}`} />
                    </a>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default GoonCards;