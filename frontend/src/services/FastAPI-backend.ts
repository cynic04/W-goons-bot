const API_URL = import.meta.env.VITE_BACKEND_API_URL_PRODUCTION;

export async function getRequest() {
    console.log('Making GET request to:', API_URL);
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
