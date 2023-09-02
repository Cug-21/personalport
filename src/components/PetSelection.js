import React from 'react';

function PetSelection({ onPetSelect }) {
    const pets = ["Cat", "Kitten", "Fish", "Bird"];

    return (
        <div>
            <h2>Select a pet:</h2>
            {pets.map((pet) => (
                <button key={pet} onClick={() => {
                    console.log("Selected:", pet); // This should print your selection
                    onPetSelect(pet);
                }}>
                    {pet}
                </button>
            ))}
        </div>
    );
}

export default PetSelection;