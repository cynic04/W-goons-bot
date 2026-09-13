import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from '@mui/material';

function DeleteTagsTable(props: {tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) {
    return (
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
                                <button onClick={() => {
                                    props.setTags(props.tags.filter((_, i) => i !== index));
                                }}>Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DeleteTagsTable;