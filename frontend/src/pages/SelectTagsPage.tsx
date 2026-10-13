import { Paper, Container, CircularProgress } from '@mui/material';
import '../css/PaperCustomCss.css'
import TagInputForm from '../components/TagInputForm.tsx'
import '../css/CenterItems.css'

function SelectTagsPage(props: {quote: string | null, loadFailed: boolean}) {

  return (
    <>
      <Container className="center-items" maxWidth="md"> 
        <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
          <h1>WGoonsBot</h1>
          <p>
            Probably our best project to date.
          </p>
        </Paper>

        <h1>
            This page is getting repurposed into a tag selection page very soon.
        </h1>
        <h3 style={{ lineHeight: '2rem' }}>
          <b>A quote from our lovely GoonsBot backend:</b><br />
          "{props.loadFailed ? 'Quote failed to load D:' 
            : props.quote ? props.quote :
            <>
              Loading...  <CircularProgress size={20} />
            </>
            }"
        </h3>

        <h4 style={{ lineHeight: '2rem' }}>
          Enter a tag below - this will be added to a list of tags on the backend. <br />
          Then, navigate to the <a href='/view-goons'>View Goons</a> page to see 15 random posts with the tags you've entered.
        </h4>

        <TagInputForm />
      </Container>
    </>
  )
}

export default SelectTagsPage