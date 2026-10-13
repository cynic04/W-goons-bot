import { Container, Paper, CircularProgress } from "@mui/material";
import TagInputForm from "../components/TagInputForm.tsx";
import "../css/CenterItems.css";
import "../css/FlexContainer.css";

function NewSelectTagsPage(props: { tagsInDatabase: string[], quote: string | null, loadFailed: boolean, reportChange: boolean, setReportChange: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <>
            <Container className="center-items">
                <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h1 style={{ fontSize: '4rem' }}>WGoonsBot</h1>
                    <p style={{ fontWeight: 'bold' }}>
                        "{props.loadFailed ? 'Quote failed to load D:' 
                        : props.quote ? props.quote :
                        <>
                            Loading...  <CircularProgress size={20} />
                        </>
                        }"
                    </p>
                </Paper>
            </Container>

            <div className="flex-container">
                <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h2 style={{ display: 'block', margin: '16px auto' }}>Select Your Tags</h2>
                    <TagInputForm reportChange={props.reportChange} setReportChange={props.setReportChange} />
                </Paper>
                <Paper className="row" style={{ maxWidth: '15rem' }} elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h2>Current Tags Selected</h2>
                    {props.tagsInDatabase.length === 0 && !props.loadFailed ? (
                        <CircularProgress size={20} />
                    ) : (
                        props.tagsInDatabase.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))
                    )}
                </Paper>
            </div>
        </>
    )
}


export default NewSelectTagsPage;