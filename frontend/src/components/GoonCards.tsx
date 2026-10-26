import {
    Card,
    CardActionArea,
    CardContent
} from '@mui/material';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import '../css/GoonCards.css';
import '../css/CenterItems.css';
import GoonModal from './GoonModal.tsx';

function GoonCards(props: { goons: any[] }) {
    // Uses Material UIs Grid and Card components to display cards in a responsive layout (xs, s and md control what happens at certain screen sizes)
    // xs: extra small screens
    // sm: small screens
    // md: medium screens
    const [open, setOpen] = useState(false);
    const [indexSelected, setIndexSelected] = useState(-1)
    const [goonInformation, setGoonInformation] = useState({"file_url": "not set yet", "tag_info": [{"tag": "not set yet"}]})
    return (
        <>
        <Grid container spacing={2}>
            {/* Easiest way to read this: for each goon in the returned goons array, create a figure element with an image and caption */}
            {/* "goon: any[]" is each individual goon in the goons array, and index is the iterator (which position in the array are we at rn) */}
                {props.goons.map((goon: any, index: number) => (
                    <Grid key={index} size={{ xs: 6, sm: 4, md: 2 }}>
                        <Card className="goon-card" sx={{ backgroundColor: '#313030' }}>
                            <CardActionArea 
                                onClick={() => {
                                    setOpen(true);
                                    setIndexSelected(index)
                                    setGoonInformation(props.goons[index])}}
                                >
                                <CardContent>
                                    <img src={goon["file_url"]} alt={`Goon ${index + 1}`} />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <GoonModal
                open={open}
                setOpen={setOpen}
                indexSelected={indexSelected}
                setIndexSelected={setIndexSelected}
                goonInformation={goonInformation}
                setGoonInformation={setGoonInformation}
                goons={props.goons}
            />
        </>
    );
}

export default GoonCards;