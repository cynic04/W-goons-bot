import { useState, useEffect } from 'react'
import { initialGetRequest } from '../services/FastAPI-backend.ts'
import TagInputForm from '../components/TagInputForm.tsx'

function HomePage() {
  const [data, setData] = useState(null)

  // fetchData function handles API call to backend
  async function fetchData() {
    const response = await initialGetRequest();
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
      <h1>WGoonsBot</h1>
      <p style={{ transform: 'translateY(-25px)' }}>
        An application built by cynic04<br />
      </p>

      <h3>
        <b>A quote from our lovely GoonsBot backend:</b><br />
        "{data ? data : 'Loading...'}"
      </h3>

      <TagInputForm />
    </>
  )
}

export default HomePage