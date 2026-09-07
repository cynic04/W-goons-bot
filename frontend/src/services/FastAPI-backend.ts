// File for all API calls to the FastAPI backend
const API_URL = import.meta.env.VITE_BACKEND_API_URL_PRODUCTION;

// Test API call just to see if the backend is returning a response and the frontend can handle it
export async function initialGetRequest() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error making GET request:', error);
        return null;
    }
}

// Adds a single tag to the database. The tagInfo parameter is a JSON string containing the tag information.
export async function addTag(tagInfo: string) {
    try {
        const response = await fetch(`${API_URL}/api/add-tag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: tagInfo,
        });
        return response;
    } catch (error) {
        console.error('Error making POST request:', error);
        return null;
    }
}

// Grabs 10 random goons based on a single randomly selected tag from the database
export async function getGoons() {
    try {
        const response = await fetch(`${API_URL}/api/get-goons`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error making GET request to get goons:', error);
        return null;
    }
}

