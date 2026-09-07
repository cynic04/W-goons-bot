import type TagsType from '../types/TagsType';
import { addTag } from '../services/FastAPI-backend';
import { useState } from 'react';

function TagInputForm() {
    const [formData, setFormData] = useState<TagsType>({ 
        tag: '' 
    });

    // when the form is submitted, determine what to do with the input value
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // handle form submission here
        const dataString = JSON.stringify(formData);
        const apiResponse = await addTag(dataString);
        
        if (!apiResponse) {
            console.error('Failed to submit tag to the backend');
            return;
        } else {
            setFormData({ tag: '' });
        }
    }

    console.log('Form data:', formData);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter a tag here:
            </label>
            <input 
                type="text"
                placeholder="Enter a tag here"
                name="tag"
                value={formData.tag}
                onChange={inputEvent => setFormData({ ...formData, tag: inputEvent.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
export default TagInputForm;
