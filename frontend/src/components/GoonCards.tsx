import {
    Card,
    CardActionArea,
    CardContent
} from '@mui/material';
import '../css/GoonCards.css';
import '../css/CenterItems.css';

function GoonCards({ goons }: { goons: any[] }) {
    return (
        <div className="goons-grid">
            {/* Easiest way to read this: for each goon in the returned goons array, create a figure element with an image and caption */}
            {/* "goon: any[]" is each individual goon in the goons array, and index is the iterator (which position in the array are we at rn) */}
                {goons.map((goon: any, index: number) => (
                    <Card key={index} className="goon-card" sx={{ backgroundColor: '#313030' }}>
                        <CardActionArea>
                            <CardContent>
                                <a href={goon["@file_url"]} target="_blank" rel="noopener noreferrer">
                                    <img src={goon["@file_url"]} alt={`Goon ${index + 1}`} />
                                </a>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
        </div>
    );
}

export default GoonCards;