import { Container, Paper, CircularProgress, Stack, Chip } from "@mui/material";
import TagInputForm from "../components/TagInputForm.tsx";
import "../css/CenterItems.css";
import "../css/FlexContainer.css";

function SelectTagsPage(props: { tagsInDatabase: string[], quote: string | null, loadFailed: boolean, reportChange: boolean, setReportChange: React.Dispatch<React.SetStateAction<boolean>> }) {

    // Tags of larger lengths will span outside of the container, so we truncate them
    function truncateTags(tags: string[]) {
        const maxLength = 17;
        return tags.map(tag => {
            if (tag.length > maxLength) {
                return tag.substring(0, maxLength) + '...';
            } else {
                return tag;
            }
        });
    }
    
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
                Enter a tag below - this will be added to your list of tags on the left. <br />
                Then, navigate to the <a href='/view-goons'>View Goons</a> page to see 15 random posts with the tags you've entered.
            </h4>

            <div className="flex-container">
                <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h2 style={{ display: 'block', margin: '16px auto' }}>Submit Tags</h2>
                    <TagInputForm reportChange={props.reportChange} setReportChange={props.setReportChange} />
                </Paper>
                <Paper className="row" style={{ maxWidth: '30rem' }} elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h2>Current Tags Stored</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {props.tagsInDatabase.length === 0 && !props.loadFailed ? (
                        <CircularProgress size={20} />
                    ) : (
                        // Calls the truncate function on the prop
                        truncateTags(props.tagsInDatabase).map((tag) => (
                            <>
                            <Stack key={tag} 
                                spacing={1} 
                                sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', 
                                    '& .MuiChip-label': {
                                    fontSize: '22px'
                                } }}>
                                <Chip label={tag} color="primary" variant="outlined" />
                             </Stack>
                             </>
                        ))
                    )}
                    </div>
                </Paper>
            </div>
        </>
    )
}


export default SelectTagsPage;