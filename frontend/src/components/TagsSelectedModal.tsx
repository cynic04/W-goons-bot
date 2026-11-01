import {
    Dialog,
    DialogContent,
    Stack,
    Chip
} from '@mui/material';
import '../css/TagPills.css'

function TagsSelected(props: { tags: string[], openTagDisplay: boolean, setOpenTagDisplay: (open: boolean) => void }) {
 return (
    <Dialog 
        open={props.openTagDisplay} 
        onClose={() => props.setOpenTagDisplay(false)}
        >
        <DialogContent style={{ overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Tags used for the displayed posts</p>
                <Stack 
                direction="row" 
                spacing={2}
                className="tag-pills"
                sx={{ justifyContent: 'center', 
                    '& .MuiChip-label': {
                        fontSize: '22px'
                    }
                }} >
            {props.tags.map((tag) => (
                <Chip label={tag} key={tag} color="primary" variant="outlined" />
            ))}
            </Stack>
        </DialogContent>
    </Dialog>
 );
}

export default TagsSelected;