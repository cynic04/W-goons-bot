import type TagsType from '../types/TagsType';
import { addTag } from '../services/FastAPI-backend';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Button, Stack, Chip } from '@mui/material';
import '../css/TagInputForm.css';
import '../css/Buttons.css';
import tagsData from '../tags.json';
import type TagJson from '../types/TagJson';


function TagInputForm(props: { reportChange: boolean, setReportChange: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [formData, setFormData] = useState<TagsType>({ 
        tag: '' 
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonText, setButtonText] = useState('Submit');

    // when the form is submitted, determine what to do with the input value
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formData.tag.trim() === '') {
            toast.error('Tag cannot be empty.');
            return;
        }
        // handle form submission here - disable submit button and make API call
        const dataString = JSON.stringify(formData);
        setIsSubmitting(true);
        setButtonText('Submitting...');

        const apiResponse = await addTag(dataString);
        setIsSubmitting(false);
        setButtonText('Submit');

        // unsuccessful API response returns an error toast
        // successful API response returns a success toast and resets form data
        if (!apiResponse) {
            toast.error('Failed to submit tag to the backend. Please try again.');
            return;
        } else {
            toast.success(`Tag "${formData.tag}" submitted successfully.`);
            setFormData({ tag: '' });
            props.setReportChange(true);
        }
    }

    // Filters the tagsData array to find tags that start with the input value
    // Red underline will show under the 'filter' function because Typescript cannot infer the type of the tagsData array (it's too large)
    // tags.json is too large for it to interpret the type of the tags.json file
    function filterTags(inputTag: string) {
        const lowerCaseInput = inputTag.toLowerCase();
        const newLowerCaseInput = lowerCaseInput.replace(/\s+/g, "_");
        const newTagsList = tagsData.filter((tag: TagJson) => tag.name.toLowerCase().startsWith(newLowerCaseInput));
        return newTagsList;
    }

    return (
    <>
        <form className="tag-input-form" onSubmit={handleSubmit}>
            <textarea
                style={{ fontSize: '20px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}
                rows={1}
                cols={25}
                placeholder="Enter a tag here"
                name="tag"
                value={formData.tag}
                onChange={inputEvent => setFormData({ ...formData, tag: inputEvent.target.value })}
                disabled={isSubmitting}
                /* Submits the form when Enter is pressed */
                /* Prevent default behavior prevents the page from reloading when this happens*/
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        handleSubmit(event as any);
                    }
                }}
            />
            <Button
                type="submit"
                disabled={isSubmitting} 
                variant="contained" 
                sx={{ backgroundColor: '#000000', color: 'white', textTransform: 'none' }}
                style={{ color: "white" }}
                >{buttonText}
            </Button>
        </form>
        <ToastContainer 
            position="bottom-center" 
            autoClose={5000}
        />
        {/* As long as the input is not empty, display tag suggestions under the Submit Tags element */}
        {/* runs the filter on the full tagsData json, truncates those tags if necessary, slices it to only show 10 results, and maps all remaining entries onto the page*/}
        {formData.tag.trim() !== '' ? (
            filterTags(formData.tag).slice(0, 5).map((tag: any) => (
                <>
                <Stack key={tag.name} 
                    spacing={3}
                    direction="column"
                    sx={{ display: 'flex', justifyContent: 'center', padding: '1rem', 
                        '& .MuiChip-label': {
                        fontSize: '20px'
                    } }}>
                    <Chip
                        color="primary"
                        onClick={() => {
                            setFormData({ ...formData, tag: tag.name });
                        }} 
                        variant="filled"
                        sx={{ height: '3rem' }}
                        label={`${tag.name} (${tag.count})`}
                    />
                </Stack>
                </>
            ))
        ) : null}
    </>
    )
}
export default TagInputForm;
