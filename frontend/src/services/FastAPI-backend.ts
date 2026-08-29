const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export async function getRequest() {
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
