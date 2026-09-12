import { Paper, Container } from '@mui/material';
import '../css/PaperCustomCss.css'
import { useState, useEffect } from 'react'
import { initialGetRequest } from '../services/FastAPI-backend.ts'
import TagInputForm from '../components/TagInputForm.tsx'
import '../css/CenterItems.css'

function HomePage() {
  const [data, setData] = useState(null)
  const [loadFailed, setLoadFailed] = useState(false);

  // fetchData function handles API call to backend
  async function fetchData() {
    const response = await initialGetRequest();
    if (!response) {
      console.error('Failed to fetch data from the backend');
      setLoadFailed(true);
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
      <Container className="center-items" maxWidth="md"> 
        <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
          <h1>WGoonsBot</h1>
          <p>
            Probably our best project to date.
          </p>
        </Paper>

        <h3 style={{ lineHeight: '2rem' }}>
          <b>A quote from our lovely GoonsBot backend:</b><br />
          "{loadFailed ? 'Quote failed to load D:' 
            : data ? data : 'Loading...'}"
        </h3>

        <p style={{ lineHeight: '2rem' }}>
          Enter a tag below - this will be added to a list of tags on the backend. <br />
          Then, navigate to the "View Goons" page to see the most recent posts with that tag.
        </p>

        <TagInputForm />
      </Container>
    </>
  )
}

export default HomePage