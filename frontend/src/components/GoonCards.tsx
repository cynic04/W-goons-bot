import {
    Card,
    CardActionArea,
    CardContent
} from '@mui/material';
import Grid from '@mui/material/Grid';
import '../css/GoonCards.css';
import '../css/CenterItems.css';

function GoonCards({ goons }: { goons: any[] }) {
    // Uses Material UIs Grid and Card components to display cards in a responsive layout (xs, s and md control what happens at certain screen sizes)
    // xs: extra small screens
    // sm: small screens
    // md: medium screens
    return (
        <Grid container spacing={2}>
            {/* Easiest way to read this: for each goon in the returned goons array, create a figure element with an image and caption */}
            {/* "goon: any[]" is each individual goon in the goons array, and index is the iterator (which position in the array are we at rn) */}
                {goons.map((goon: any, index: number) => (
                    <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
                        <Card className="goon-card" sx={{ backgroundColor: '#313030', maxHeight: '400px' }}>
                            <CardActionArea>
                                <CardContent>
                                    <a href={goon["@file_url"]}>
                                        <img src={goon["@file_url"]} alt={`Goon ${index + 1}`} />
                                    </a>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
}

export default GoonCards;