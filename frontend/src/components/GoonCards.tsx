import './GoonCards.css';

function GoonCards({ goons }: { goons: any[] }) {
    return (
        <div className="goons-grid">
            {/* Easiest way to read this: for each goon in the returned goons array, create a figure element with an image and caption */}
            {/* "goon: any" is each individual goon in the goons array, and index is the iterator (which position in the array are we at rn) */}
            {goons.map((goon: any, index: number) => (
                <figure key={index} className="goon-card">
                    <a href={goon["@file_url"]} target="_blank" rel="noopener noreferrer">
                        <img src={goon["@file_url"]} alt={`Goon ${index + 1}`} />
                    </a>
                    <figcaption>Goon {index + 1}</figcaption>
                </figure>
            ))}
        </div>
    );
}

export default GoonCards;