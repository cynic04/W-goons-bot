import { 
    Paper, 
    Container,
} from '@mui/material'
import '../css/CenterItems.css'
import '../css/PaperCustomCss.css'
import type TagsType from '../types/TagsType'
import { getTags, deleteTag } from '../services/FastAPI-backend'
import { useState, useEffect } from 'react'
import DeleteTagsTable from '../components/DeleteTagsTable'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function DeleteTagsPage() {
    const [tags, setTags] = useState<string[]>([]);

    // Function that fetches the tags from the backend API and updates the state
    async function fetchTags() {
        const response = await getTags();
        if (response) {
            const data = await response.json();
            if (data.tags && data.tags.length > 0) {
                setTags(data.tags);
            } else {
                setTags(['None']);
            }
        }
    }

    // Function that handles the deletion of a tag and updates the state
    async function handleDeleteTag(tag: string) {
        const tagInfo: TagsType = { "tag": tag };
        const response = await deleteTag(JSON.stringify(tagInfo));
        if (response) {
            const data = await response.json();
             if (data.tags && data.tags.length > 0) {
                setTags(data.tags);
            } else {
                setTags(['None']);
            }
            toast.success(`Tag "${tag}" deleted successfully!`);
        }
    }

    // Fetch tags from the database when the component mounts
    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <>
            <div className="center-items">
                <Container maxWidth="md" sx={{ marginBottom: '4rem' }}>
                    <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                        <h1>View/Delete Tags</h1>
                    </Paper>
                </Container>
                <DeleteTagsTable tags={tags} handleDeleteTag={handleDeleteTag} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                />
            </div>
        </>
    );
}

export default DeleteTagsPage;