import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    CircularProgress
} from '@mui/material';
import '../css/CenterItems.css'

function DeleteTagsTable(props: {tags: string[], handleDeleteTag: (tag: string) => Promise<void> }) {
    return (
        <>
        { /* If the tags have not yet been returned from the API call, show a loading indicator */ }
            {props.tags.length === 0 ? (
                <>
                    <div className="center-items">
                        <p>Loading tags...</p>
                        <CircularProgress sx={{ color: 'inherit' }} />     
                    </div>
                </>
            ) : (
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
                                            props.handleDeleteTag(tag)
                                        }} 
                                        >Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}

export default DeleteTagsTable;