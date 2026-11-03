import { 
    CircularProgress, 
    Container, 
    Paper,
    Button
} from "@mui/material";
import "../css/CenterItems.css";
import GoonCards from "../components/GoonCards.tsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../css/PaperCustomCss.css'

function FavoritesPage(props: {favorites: string[]}) {
    const [page, setPage] = useState(1);
    const [lowerUpperBound, setLowerUpperBound] = useState([0, 10]);

    return (
        <>
            <div className="center-items">
                <Container maxWidth="md">
                    <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
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
                {props.favorites[0] === 'None' && <p>No favorites yet. <NavLink to="/view-goons">Go find some posts to favorite!</NavLink></p>}

                {props.favorites[0] !== 'None' && (
                    <div style={{ padding: '16px' }}>
                        <GoonCards goons={props.favorites.slice(lowerUpperBound[0], lowerUpperBound[1])} noHorizontalScroll={true} />
                    </div>
                )}
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
                    disabled={lowerUpperBound[1] >= props.favorites.length}
                >Next</Button>
            </div>
        </>
    );
}

export default FavoritesPage;