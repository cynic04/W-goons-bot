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
        Probably our best project to date.<br />
      </p>

      <h3 style={{ lineHeight: '2rem' }}>
        <b>A quote from our lovely GoonsBot backend:</b><br />
        "{data ? data : 'Loading...'}"
      </h3>

      <p>
        Enter a tag below - this will be added to a list of tags on the backend. <br />
        Then, navigate to the "View Goons" page to see the most recent posts with that tag.
      </p>

      <TagInputForm />
    </>
  )
}

export default HomePage