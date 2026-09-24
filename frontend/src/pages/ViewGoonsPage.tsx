import {
    Paper,
    Container,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    Button,
    Stack,
    Chip
} from '@mui/material'; 
import { getGoons, getTags } from '../services/FastAPI-backend.ts';
import { useState, useEffect } from 'react';
import '../css/GoonCards.css';
import '../css/CenterItems.css';
import GoonCards from '../components/GoonCards.tsx';
import { NavLink } from 'react-router-dom';


function ViewGoons() {
    // Same pattern as HomePage, but this time we fetch data from the get_goons endpoint
    // Eventually this will display images, I just need it to be a JSON for now
    const [goonsData, setGoonsData] = useState<any[]>([]);
    const [tagSelected, setTagSelected] = useState<string[]>([]);
    const [tagsInDatabase, setTagsInDatabase] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadFailed, setLoadFailed] = useState<boolean>(false);
    const [noGoonsFound, setNoGoonsFound] = useState<boolean>(false);
    const [tagCombo, setTagCombo] = useState<boolean>(false);

    async function fetchGoons() {
        setLoading(true);
        const response = await getGoons(tagCombo);
        if (!response) {
            console.error('Failed to fetch goons from the backend');
            setLoadFailed(true);
            setLoading(false);
            return;
        }
        const jsonData = await response.json();
        if (jsonData.data.posts === undefined) {
            setNoGoonsFound(true);
            setLoading(false);
            return;
        }
        const goons = jsonData.data.posts.post;
        setGoonsData(goons);
        setTagSelected(jsonData.tags);
        setLoading(false);
    }

    async function fetchTags() {
        const response = await getTags();
        if (!response) {
            console.error('Failed to fetch tags from the backend');
            return;
        }
        const jsonData = await response.json();
        const tags = jsonData.tags;
        if (tags.length > 0) {
            setTagsInDatabase(tags);
        }
    }

    // Fetch goons and fetch tags both happen on component mount
    // Fetch goons is set to trigger whenever the tag combo flag is changed
    useEffect(() => {
        fetchTags();
    }, []);

    useEffect(() => {
        if (loadFailed) setLoadFailed(false);
        fetchGoons();
    }, [tagCombo]);
    
    return (
        <>
            <div className="center-items">
                <Container maxWidth="md">
                    <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                        <h1>View Goons</h1>
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
                    <div style={{ lineHeight: "40px" }}>
                        <h2>Displaying 15 random posts with the following tag(s) selected</h2>
                        <Stack 
                            direction="row" 
                            spacing={2}
                            sx={{ justifyContent: 'center', 
                                '& .MuiChip-label': {
                                    fontSize: '22px'
                                }
                            }} >
                        {tagSelected.map((tag) => (
                            <Chip label={tag} key={tag} color="primary" variant="outlined" />
                        ))}
                        </Stack>
                        {tagsInDatabase.length >= 2 ? (
                            <FormControlLabel
                            sx={{ color: 'white', margin: '20px' }}
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
                        <br />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={fetchGoons}
                            disabled={loading}
                            sx={{ backgroundColor: '#313030', textTransform: 'none', marginBottom: '20px' }}
                            style={{ color: 'white'}}>
                            Reload Goons
                        </Button>
                        <br />
                        <NavLink
                            to='/customize-tags'
                            style={{ color: 'white', textDecoration: 'none' }}
                        >
                            <Button variant='contained' sx={{ backgroundColor: 'black', textTransform: 'none', marginBottom: '20px' }}>
                                View/Customize Tags
                            </Button>
                        </NavLink>
                        <GoonCards goons={goonsData} />
                    </div>
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