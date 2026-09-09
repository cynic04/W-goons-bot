import type TagsType from '../types/TagsType';
import { addTag } from '../services/FastAPI-backend';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../css/TagInputForm.css';
import '../css/Buttons.css';
import 'react-toastify/dist/ReactToastify.css';

function TagInputForm() {
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
        }
    }

    return (
    <>
        <form className="tag-input-form" onSubmit={handleSubmit}>
            <textarea
                style={{ fontSize: '20px', textAlign: 'center' }}
                rows={1}
                cols={45}
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
            <button type="submit" disabled={isSubmitting}>{buttonText}</button>
        </form>
        <ToastContainer 
            position="bottom-center" 
            autoClose={5000}
        />
    </>
    )
}
export default TagInputForm;
