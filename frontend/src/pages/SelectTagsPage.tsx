import { Container, Paper, CircularProgress, Stack, Chip } from "@mui/material";
import TagInputForm from "../components/TagInputForm.tsx";
import "../css/CenterItems.css";
import "../css/FlexContainer.css";
import { truncateTags } from "../services/truncateTags.ts";
import '../css/TagPills.css'

function SelectTagsPage(props: { tagsInDatabase: string[], quote: string | null, loadFailed: boolean, reportChange: boolean, setReportChange: React.Dispatch<React.SetStateAction<boolean>> }) {
     return (
        <>
            <Container className="center-items">
                <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h1 style={{ fontSize: '3.5rem' }}>WGoonsBot</h1>
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

            <h4 style={{ lineHeight: '2rem', textAlign: 'center' }}>
                Finished adding tags? Navigate to the <a href='/view-goons'>View Goons</a> page to see 15 random posts with the tags you've entered!
            </h4>
            <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                <h2 style={{ margin: '16px 0 16px' }}>
                    Submit Tags
                </h2>
                <p style={{ margin: '10px 0', color: '#D3D3D3' }}>Type in the box below to see some relevant tag results.</p>
                <p style={{ margin: '10px 0', color: '#D3D3D3' }}>Please note that these results only display the top 40,020 tags on Rule 34.</p>
                <p style={{ margin: '2px 0', color: '#D3D3D3', fontSize: "12px" }}>{"which took 1,001 API calls to gather..."}</p>
                <p style={{ margin: '10px 0', color: '#D3D3D3' }}>Click on a tag suggestion to have it automatically fill the text box.</p>
                <TagInputForm reportChange={props.reportChange} setReportChange={props.setReportChange} />
            </Paper>
            <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                <h2>Current Tags Stored</h2>
                <div className="tag-pills">
                {props.tagsInDatabase.length === 0 && !props.loadFailed ? (
                    <CircularProgress size={20} />
                ) : (
                    // Calls the truncate function on the prop
                    truncateTags(props.tagsInDatabase).map((tag, index) => (
                        <>
                            <Stack key={index} 
                                spacing={1} 
                                sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', 
                                    '& .MuiChip-label': {
                                    fontSize: '22px'
                                } }}>
                                <Chip key={index} label={tag} color="primary" variant="outlined" />
                            </Stack>
                        </>
                    ))
                )}
                </div>
            </Paper>
        </>
    )
}


export default SelectTagsPage;