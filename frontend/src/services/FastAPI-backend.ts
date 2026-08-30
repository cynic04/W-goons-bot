// File for all API calls to the FastAPI backend
const API_URL = import.meta.env.VITE_BACKEND_API_URL_PRODUCTION;

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

