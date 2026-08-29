export async function getRequest(url: string) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error making GET request:', error);
    }
}
