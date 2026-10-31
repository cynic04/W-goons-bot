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
import useEmblaCarousel from 'embla-carousel-react'

function GoonCards(props: { goons: any[] }) {
    const [open, setOpen] = useState(false);
    const [indexSelected, setIndexSelected] = useState(-1)
    const [goonInformation, setGoonInformation] = useState({"file_url": "not set yet", "tag_info": [{"tag": "not set yet"}]})
    // Embla carousel react hook - wrapping elements in a div with this as the ref will make it draggable horizontally
    const [emblaRef] = useEmblaCarousel({ dragFree: true })
    return (
        <>
        <div ref={emblaRef} style={{ overflow: 'hidden', marginBottom: '20px' }}>
            <Grid container spacing={2} sx={{ flexWrap: 'nowrap'}}>
                {/* Easiest way to read this: for each goon in the returned goons array, create a figure element with an image and caption */}
                {/* "goon: any[]" is each individual goon in the goons array, and index is the iterator (which position in the array are we at rn) */}
                    {props.goons.map((goon: any, index: number) => (
                        <Grid key={index} sx={{ flex: '0 0 auto', width: 360 }}>
                            <Card className="goon-card" sx={{ backgroundColor: '#313030' }}>
                                <CardActionArea 
                                    onClick={() => {
                                        setOpen(true);
                                        setIndexSelected(index)
                                        setGoonInformation(props.goons[index])}}
                                    >
                                    <CardContent>
                                        <img src={goon["file_url"]} alt={`Goon ${index + 1}`}/>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
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