import { Container, Paper } from "@mui/material";
import TagInputForm from "../components/TagInputForm.tsx";
import "../css/CenterItems.css";
import "../css/FlexContainer.css";

function NewSelectTagsPage(props: { tagsInDatabase: string[] }) {

    return (
        <>
            <Container className="center-items">
                <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h1 style={{ fontSize: '4rem' }}>WGoonsBot</h1>
                    <p>We'll start loading the quote here instead.</p>
                </Paper>
            </Container>

            <div className="flex-container">
                <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h2 style={{ display: 'block', margin: '16px auto' }}>Select Your Tags</h2>
                    <TagInputForm />
                </Paper>
                <Paper className="row" style={{ maxWidth: '15rem' }} elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h2>Tags Selected</h2>
                </Paper>
            </div>
        </>
    )
}


export default NewSelectTagsPage;