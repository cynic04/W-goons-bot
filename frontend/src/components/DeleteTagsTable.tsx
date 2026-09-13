import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    CircularProgress,
    Container
} from '@mui/material';
import '../css/CenterItems.css'
import { useState } from 'react';

function DeleteTagsTable(props: {tags: string[], handleDeleteTag: (tag: string) => Promise<void> }) {
    const [deletingTag, setDeletingTag] = useState<string | null>(null);
    return (
        <>
        { /* If the tags have not yet been returned from the API call, show a loading indicator */ }
            {props.tags.length === 0 ? (
                <>
                    <div className="center-items">
                        <p>Loading tags to delete...</p>
                        <CircularProgress sx={{ color: 'inherit' }} />     
                    </div>
                </>
            ) : props.tags[0] === 'None' ? (
                <div className="center-items">
                    <p>No tags available to delete.</p>
                </div>
                
            ) : (
            <Container maxWidth="md">
                <TableContainer component={Paper} sx={{ backgroundColor: '#313030', color: 'white' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ color: 'white' }}>Tag</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.tags.map((tag, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" sx={{ color: 'white' }}>{tag}</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>
                                        <button 
                                            onClick={() => {
                                                setDeletingTag(tag);
                                                props.handleDeleteTag(tag).finally(() => {
                                                    setDeletingTag(null);
                                                });
                                            }} 
                                            disabled={deletingTag !== null}
                                        >   
                                            { /* Show 'Deleting...' if this tag is being deleted, otherwise show 'Delete' */ }
                                            {deletingTag === tag ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            )}
        </>
    );
}

export default DeleteTagsTable;