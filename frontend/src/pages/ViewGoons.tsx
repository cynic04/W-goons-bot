import {
    Paper,
    Container,
    CircularProgress,
    FormControlLabel,
    Checkbox
} from '@mui/material'; 
import { getGoons, getTags } from '../services/FastAPI-backend.ts';
import { useState, useEffect } from 'react';
import '../css/GoonCards.css';
import '../css/CenterItems.css';
import GoonCards from '../components/GoonCards.tsx';

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
                {tagsInDatabase.length > 2 && !loading ? (
                    <FormControlLabel
                    control={
                        <Checkbox
                            checked={tagCombo}
                            onChange={(e) => setTagCombo(e.target.checked)}
                            color="primary"
                            size="large"
                            sx={{ color: 'white' }}
                        />
                    }
                    sx={{ color: 'white' }}
                    label="Enable Randomized Tag Combination"
                />
                ) : null}
                {goonsData.length > 0 && !loading ? (
                    <>  
                        <h2>Displaying 15 random posts with the tag{tagCombo ? `s: ${tagSelected.join(', ')}` : `: ${tagSelected[0]}`}</h2>
                        <h3>Current listing of tags in the database: {tagsInDatabase.join(', ')}</h3>
                        <GoonCards goons={goonsData} />
                    </>

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
                    <p>No goons to display.</p>
                )}
            </div>
        </>
    );

}

export default ViewGoons;