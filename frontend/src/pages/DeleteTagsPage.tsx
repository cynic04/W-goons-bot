import '../css/CenterItems.css'
import '../css/PaperCustomCss.css'
import { useState, useEffect } from 'react'
import { 
    Paper, 
    Container,
} from '@mui/material'
import DeleteTagsTable from '../components/DeleteTagsTable'

function DeleteTagsPage() {
    const [tags, setTags] = useState<string[]>([
        'tag1',
        'tag2',
        'tag3',
    ]);

    return (
        <>
            <div className="center-items">
                <Container maxWidth="md">
                    <Paper elevation={12} className="headers" sx={{ backgroundColor: '#313030', color: 'white' }}>
                        <h1>Delete Tags</h1>
                    </Paper>
                </Container>
                <DeleteTagsTable tags={tags} setTags={setTags} />
            </div>
        </>
    );
}

export default DeleteTagsPage;