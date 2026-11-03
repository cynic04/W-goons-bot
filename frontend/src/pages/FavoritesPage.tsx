import { 
    CircularProgress, 
    Container, 
    Paper,
    Button
} from "@mui/material";
import "../css/CenterItems.css";
import GoonCards from "../components/GoonCards.tsx";
import { useState } from "react";

function FavoritesPage(props: {favorites: string[]}) {
    const [page, setPage] = useState(1);
    const [lowerUpperBound, setLowerUpperBound] = useState([0, 10]);

    return (
        <>
            <div className="center-items">
                <Container maxWidth="md">
                    <Paper elevation={6} sx={{ backgroundColor: '#313030', color: 'white', padding: '16px' }}>
                        <h1>Your Favorites</h1>
                        <p style={{ fontSize: '15px' }}>Click on a card to enlarge the image</p>
                    </Paper>
                </Container>
                {props.favorites === undefined && (
                    <>
                        <p>Loading your favorites...</p>
                        <CircularProgress sx={{ color: 'white'}} aria-label="Loading goons" />
                    </>
                )}
                <div style={{ padding: '16px' }}>
                    <GoonCards goons={props.favorites.slice(lowerUpperBound[0], lowerUpperBound[1])} noHorizontalScroll={true} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Button 
                    onClick={() => {
                        setPage(page - 1);
                        setLowerUpperBound([lowerUpperBound[0] - 10, lowerUpperBound[1] - 10]);
                    }}
                    disabled={page === 1}
                >Prev</Button>
                <p>{page}</p>
                <Button 
                    onClick={() => {
                        setPage(page + 1);
                        setLowerUpperBound([lowerUpperBound[0] + 10, lowerUpperBound[1] + 10]);
                    }}
                >Next</Button>
            </div>
        </>
    );
}

export default FavoritesPage;