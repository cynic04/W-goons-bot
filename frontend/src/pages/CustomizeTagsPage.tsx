import { 
    Paper, 
    Container,
} from '@mui/material'
import '../css/CenterItems.css'
import '../css/PaperCustomCss.css'
import type TagsType from '../types/TagsType'
import { deleteTag } from '../services/FastAPI-backend'
import DeleteTagsTable from '../components/DeleteTagsTable'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../services/UserContext'

function CustomizeTagsPage(props: { tagsInDatabase: string[], setTagsInDatabase: React.Dispatch<React.SetStateAction<string[]>>, reportChange: boolean, setReportChange: React.Dispatch<React.SetStateAction<boolean>> }) {

    const user = useUserContext()
    // Function that handles the deletion of a tag and updates the state
    async function handleDeleteTag(tag: string) {
        const tagInfo: TagsType = { "tag": tag, userID: user.userID };
        const response = await deleteTag(JSON.stringify(tagInfo));
        if (response) {
            const data = await response.json();
             if (data.tags && data.tags.length > 0) {
                props.setTagsInDatabase(data.tags);
            } else {
                props.setTagsInDatabase(['None']);
            }
            toast.success(`Tag "${tag}" deleted successfully!`);
            props.setReportChange(true);
        }
    }

    return (
        <>
            <div className="center-items">
                <Container maxWidth="md" sx={{ marginBottom: '4rem' }}>
                    <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                        <h1>Customize Tags</h1>
                    </Paper>
                <p>For now, all you can do is delete tags from here... future features TBD!</p>
                </Container>
                <DeleteTagsTable tags={props.tagsInDatabase} handleDeleteTag={handleDeleteTag} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                />
            </div>
        </>
    );
}

export default CustomizeTagsPage;