import type TagsType from '../types/TagsType';
import { useState } from 'react';

function TagInputForm() {
    const [formData, setFormData] = useState<TagsType>({ 
        tag: '' 
    });

    // when the form is submitted, determine what to do with the input value
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // handle form submission here
        console.log('Form submitted with value:', formData.tag);
    }

    // when a value changes in the form, update the state with the new value
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        console.log('Input changed:', name, value);
        // Takes the original form data and updates only the specified field that changed
        // We only have one field here, but when the form expands, this will handle multiple input fields
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

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
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
export default TagInputForm;
