import { getGoons, getTags } from '../services/FastAPI-backend.ts';
import { useState, useEffect } from 'react';
import '../css/GoonCards.css';
import GoonCards from '../components/GoonCards.tsx';

function ViewGoons() {
    // Same pattern as HomePage, but this time we fetch data from the get_goons endpoint
    // Eventually this will display images, I just need it to be a JSON for now
    const [goonsData, setGoonsData] = useState<any[]>([]);
    const [tagSelected, setTagSelected] = useState<string>('');
    const [tagsInDatabase, setTagsInDatabase] = useState<string[]>([]);

    async function fetchGoons() {
        const response = await getGoons();
        if (!response) {
            console.error('Failed to fetch goons from the backend');
            return;
        }
        const jsonData = await response.json();
        const goons = jsonData.data.posts.post;
        setGoonsData(goons);
        setTagSelected(jsonData.tags);
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

    // Call the API handler function when the page loads
    useEffect(() => {
        fetchTags();
        fetchGoons();
    }, []);
    
    return (
        <>
            <div>
                <h1>View Goons</h1>
                {goonsData.length > 0 ? (
                    <>  
                        <h2>Displaying most recent R34 posts with the tag: <b>{tagSelected}</b></h2>
                        <h3>Current listing of tags in the database: {tagsInDatabase.length > 0 ? tagsInDatabase.join(', ') : 'No tags in database'}</h3>
                        <GoonCards goons={goonsData} />
                    </>
                ) : (
                    <p>Loading goons...</p>
                )}
            </div>
        </>
    );

}

export default ViewGoons;