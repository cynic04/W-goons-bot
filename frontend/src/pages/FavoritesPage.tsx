import { Container, Paper } from "@mui/material";
import "../css/CenterItems.css";

function FavoritesPage() {
    return (
        <Container className="center-items">
            <Paper elevation={6} sx={{ backgroundColor: '#313030', color: 'white', padding: '16px' }}>
                <h1>Your Favorites</h1>
                <p style={{ fontSize: '15px' }}>Click on a card to enlarge the image</p>
            </Paper>
        </Container>
    );
}

export default FavoritesPage;