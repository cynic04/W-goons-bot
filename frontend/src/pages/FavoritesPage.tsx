import { Container, Paper } from "@mui/material";
import "../css/CenterItems.css";
import { useEffect, useState } from "react";
import { getFavorites } from "../services/FastAPI-backend.ts";
import { useUserContext } from "../services/UserContext.tsx";
import GoonCards from "../components/GoonCards.tsx";

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useUserContext();

    async function fetchFavorites() {
        setLoading(true);
        const response = await getFavorites(user.userID);
        if (response) {
            const jsonData = await response.json();
            setFavorites(jsonData.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchFavorites();
    }, []);


    return (
        <div className="center-items">
            <Container>
                <Paper elevation={6} sx={{ backgroundColor: '#313030', color: 'white', padding: '16px' }}>
                    <h1>Your Favorites</h1>
                    <p style={{ fontSize: '15px' }}>Click on a card to enlarge the image</p>
                </Paper>
            </Container>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '16px' }}>
                    <GoonCards goons={favorites} />
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;