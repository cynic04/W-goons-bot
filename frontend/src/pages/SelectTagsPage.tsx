import { Container, Paper, CircularProgress, Stack, Chip } from "@mui/material";
import { useState } from "react";
import TagInputForm from "../components/TagInputForm.tsx";
import "../css/CenterItems.css";
import "../css/FlexContainer.css";
import { truncateTags } from "../services/truncateTags.ts";
import '../css/TagPills.css'
import { NavLink } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { deleteTag } from "../services/FastAPI-backend.ts";
import type TagsType from "../types/TagsType.ts";
import { useUserContext } from "../services/UserContext.tsx";
import { useReportChange } from "../services/ReportChange.tsx";


function SelectTagsPage(props: { tagsInDatabase: string[], quote: string | null, loadFailed: boolean, setTagsInDatabase: (tags: string[]) => void }) {
    const user = useUserContext();
    const report = useReportChange();
    const [disabled, setDisabled] = useState(false);

    // Function that handles the deletion of a tag and updates the state
    async function handleDeleteTag(tag: string) {
        setDisabled(true);
        const tagInfo: TagsType = { "tag": tag, userID: user.userID };
        const response = await deleteTag(JSON.stringify(tagInfo));
        if (response) {
            const data = await response.json();
                if (data.tags && data.tags.length > 0) {
                props.setTagsInDatabase(data.tags);
            } else {
                props.setTagsInDatabase(['None']);
            }
            toast.success(`Tag "${tag}" deleted successfully!`, { containerId: "delete-tag-toast" });
            report.setReportChanged(true);
        }
        setDisabled(false);
    }

     return (
        <>
            <Container className="center-items">
                <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <h1 style={{ fontSize: '3.5rem' }}>wgoons.bot</h1>
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
                Finished adding tags? Navigate to the <NavLink to='/view-goons'>View Goons</NavLink> page to see 15 random posts with the tags you've entered!
            </h4>
            <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                <h2 style={{ margin: '16px 0 16px' }}>
                    Submit Tags
                </h2>
                <p style={{ margin: '10px 0', color: '#D3D3D3' }}>Type in the box below to see some relevant tag results.</p>
                <p style={{ margin: '3px 0', color: '#D3D3D3' }}>Hit submit to add the tag to your current tags stored.</p>
                <TagInputForm />
            </Paper>
            <Paper className="row" elevation={6} sx={{ backgroundColor: '#313030', color: 'white' }}>
                <h2 style={{ margin: '16px 0 16px' }}>Current Tags Stored</h2>
                {props.tagsInDatabase[0] !== 'None' && (
                    <p style={{ margin: '10px 0', color: '#D3D3D3' }}>Click on a tag to remove it from this list.</p>
                )}
                <div className="tag-pills">
                {props.tagsInDatabase.length === 0 && !props.loadFailed && props.tagsInDatabase[0] !== 'None' && (
                    <CircularProgress size={20} />
                )}

                {props.tagsInDatabase[0] === 'None' && (
                    <p style={{ margin: '10px 0', color: '#D3D3D3' }}>No tags in database. Add some using the text box above!</p>
                )}

                {props.tagsInDatabase[0] !== 'None' && props.tagsInDatabase.length > 0 && (
                    // Calls the truncate function on the prop
                    truncateTags(props.tagsInDatabase).map((tag, index) => (
                        <>
                            <Stack key={index} 
                                spacing={1} 
                                sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', 
                                    '& .MuiChip-label': {
                                    fontSize: '22px'
                                } }}>
                                <Chip 
                                    key={index} 
                                    label={tag} 
                                    disabled={disabled}
                                    onClick={() => handleDeleteTag(tag)} 
                                    color="primary" 
                                    variant="outlined" 
                                />
                            </Stack>
                        </>
                    ))
                )}
                </div>
            </Paper>
            <ToastContainer
                containerId="delete-tag-toast" 
                position="bottom-center" 
                autoClose={5000}
            />
        </>
    )
}

export default SelectTagsPage;