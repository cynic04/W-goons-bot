import {
    Paper,
    Container,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    Button
} from '@mui/material'; 
import { getGoons } from '../services/FastAPI-backend.ts';
import { useState, useEffect } from 'react';
import '../css/GoonCards.css';
import '../css/CenterItems.css';
import GoonCards from '../components/GoonCards.tsx';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../services/UserContext.tsx';
import TagsSelectedModal from '../components/TagsSelectedModal.tsx';


function ViewGoons(props: { tagsInDatabase: string[] }) {
    // Same pattern as HomePage, but this time we fetch data from the get_goons endpoint
    // Eventually this will display images, I just need it to be a JSON for now
    const user = useUserContext();
    const [goonsData, setGoonsData] = useState<any[]>([]);
    const [tagSelected, setTagSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadFailed, setLoadFailed] = useState<boolean>(false);
    const [noGoonsFound, setNoGoonsFound] = useState<boolean>(false);
    const [tagCombo, setTagCombo] = useState<boolean>(false);
    const [openTagDisplay, setOpenTagDisplay] = useState(false);

    async function fetchGoons() {
        setLoading(true);
        const response = await getGoons(tagCombo, user.userID);
        if (!response) {
            console.error('Failed to fetch goons from the backend');
            setLoadFailed(true);
            setLoading(false);
            return;
        }
        const jsonData = await response.json();
        if (jsonData.data.length <= 0) {
            setNoGoonsFound(true);
            setLoading(false);
            return;
        }
        const goons = jsonData.data;
        setGoonsData(goons);
        setTagSelected(jsonData.tags);
        setLoading(false);
    }

    useEffect(() => {
        if (loadFailed) setLoadFailed(false);
        fetchGoons();
    }, [tagCombo, user.userID]);
    
    return (
        <>
            <div className="center-items">
                <Container maxWidth="md">
                    <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                        <h1>View Goons</h1>
                        <p style={{ fontSize: '15px' }}>Click on a card to enlarge the image</p>
                    </Paper>
                </Container>
                {/* If goons load properly, display:
                - 15 random posts
                - The tags used to retrieve those posts
                - The images of those posts
                - Options to reload the posts, view/delete tags in the database, and enable tag randomization (if 2 or more tags are in the database)
                */}
                {goonsData.length > 0 && !loading ? (
                    <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px', paddingTop: '20px' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={fetchGoons}
                            disabled={loading}
                            sx={{ backgroundColor: '#313030', textTransform: 'none', marginBottom: '20px' }}
                            style={{ color: 'white' }}>
                            Reload Goons
                        </Button>
                        
                        <NavLink
                            to='/customize-tags'
                            style={{ color: 'white', textDecoration: 'none' }}
                        >
                            <Button variant='contained' size="large" sx={{ backgroundColor: 'black', textTransform: 'none', marginBottom: '20px' }}>
                                View/Customize Tags
                            </Button>
                        </NavLink>
                    </div>

                    {props.tagsInDatabase.length >= 2 ? (
                            <FormControlLabel
                                sx={{ color: 'white' }}
                                label="Enable Randomized Tag Combination"
                                control={
                                    <Checkbox
                                        checked={tagCombo}
                                        onChange={(e) => setTagCombo(e.target.checked)}
                                        color="primary"
                                        size="large"
                                        sx={{ color: 'white' }} />
                            } />
                        ) : null}

                        <div style={{ display: "flex", flexDirection: "row", gap: '40px' }}>
                            <h2>15 random posts</h2>
                            <Button onClick={() => setOpenTagDisplay(true)}>Show Tags Used</Button>
                            <TagsSelectedModal tags={tagSelected} openTagDisplay={openTagDisplay} setOpenTagDisplay={setOpenTagDisplay} />
                        </div>
                        <GoonCards goons={goonsData} />
                    </>
                    
                // Error handling - if the load fails, if there are no goons, and if loading is in progress, display something
                ) : loadFailed ? (
                    <p style={{ color: 'red' }}>Failed to load goons. Please try again later.</p>

                ) : noGoonsFound ? (
                    <p>No goons found.</p>
                    
                ) : loading ? (
                    <>
                        <p>Loading goons...</p>
                        <CircularProgress sx={{ color: 'white'}} aria-label="Loading goons" />
                    </>
                ) : (
                    <>
                    <p>No goons to display.</p>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={fetchGoons}
                            disabled={loading}
                            sx={{ backgroundColor: '#313030', textTransform: 'none', marginBottom: '20px' }}
                            style={{ color: 'white'}}>
                            Reload Goons
                        </Button>
                    </>
                )}
            </div>
        </>
    );

}

export default ViewGoons;