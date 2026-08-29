import { useState, useEffect } from 'react'
import { getRequest } from '../services/FastAPI-backend.ts'
import TagInputForm from '../components/TagInputForm.tsx'

function HomePage() {
  const [data, setData] = useState(null)

  // fetchData function handles API call to backend
  async function fetchData() {
    const response = await getRequest();
    if (!response) {
      console.error('Failed to fetch data from the backend');
      return;
    }
    const jsonData = await response.json();
    const message = jsonData.message;
    setData(message);
  }

  // useEffect calls fetchData when the page loads
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>WELCOME TO W GOONS!!!</h1>
      <p>
        I'm going to test API calls below this text watch the FUCK OUT
      </p>
      <p>
        <b>API Response from backend:</b> {data ? data : 'Loading...'}
      </p>
      <TagInputForm />
    </>
  )
}

export default HomePage