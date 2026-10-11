import { useState } from "react";
import tags from "../tags.json";

function NewSelectTagsPage() {
    const tagsFromJson: any[] = tags;
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [numbersGenerated, setNumbersGenerated] = useState(false);
    
    function twentyRandomNumbers() {
        let iteration = 0
        for (iteration; iteration <= 20; iteration++) {
            let randomNumber = Math.floor(Math.random() * (100 - 0) + 0)
            randomNumbers.push(randomNumber)
            setRandomNumbers(randomNumbers);
        }
        setNumbersGenerated(true);
        console.log(randomNumbers);
    }

    return (
        <>
            <div>
                <h1>Select Tags</h1>
                <button onClick={twentyRandomNumbers}>Generate Random Numbers</button>
                {numbersGenerated && randomNumbers.map((number, index) => (
                    <div key={index}>
                        <h2>Tag {number}</h2>
                        <p>{JSON.stringify(tagsFromJson[number])}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default NewSelectTagsPage;