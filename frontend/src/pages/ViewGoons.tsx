import { getGoons } from '../services/FastAPI-backend.ts';
import { useState, useEffect } from 'react';
import '../../css/GoonCards.css';
import GoonCards from '../components/GoonCards.tsx';

function ViewGoons() {
    // Same pattern as HomePage, but this time we fetch data from the get_goons endpoint
    // Eventually this will display images, I just need it to be a JSON for now
    const [goonsData, setGoonsData] = useState<any[]>([]);

    async function fetchGoons() {
        const response = await getGoons();
        if (!response) {
            console.error('Failed to fetch goons from the backend');
            return;
        }
        const jsonData = await response.json();
        const goons = jsonData.data.posts.post;
        setGoonsData(goons);
    }

    // Call the API handler function when the page loads
    useEffect(() => {
        fetchGoons();
    }, []);
    
    return (
        <>
            <div>
                <h1>View Goons</h1>
                {goonsData.length > 0 ? (
                    <GoonCards goons={goonsData} />
                ) : (
                    <p>Loading goons...</p>
                )}
            </div>
        </>
    );

}

export default ViewGoons;