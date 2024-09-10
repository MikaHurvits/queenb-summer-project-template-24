import React, { useState } from 'react';
import './styles/IngredientsSelectionBox.css';

const IngredientsSelectionBox = () => {
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [customIngredient, setCustomIngredient] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [error, setError] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    const predefinedIngredients = ['Flour', 'Sugar', 'Butter', 'Eggs'];
    const unitsList = ['grams', 'cups', 'tablespoons', 'teaspoons'];

    const handleIngredientChange = (event) => {
        const value = event.target.value;
        setSelectedIngredient(value);
        if (value !== 'Other') {
            setCustomIngredient('');
        }
    };

    const handleCustomIngredientChange = (event) => {
        setCustomIngredient(event.target.value);
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (value < 0) {
            setError('Quantity cannot be negative');
        } else if (value === '') {
            setError('Quantity is required');
        } else {
            setError('');
        }
        setSelectedQuantity(value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const addIngredient = () => {
        if (!selectedIngredient && !customIngredient) {
            setError('Ingredient is required');
            return;
        }
        if (!selectedQuantity) {
            setError('Quantity is required');
            return;
        }
        if (!unit) {
            setError('Unit is required');
            return;
        }

        const ingredient = selectedIngredient === 'Other' ? customIngredient : selectedIngredient;
        const newIngredient = { ingredient, quantity: selectedQuantity, unit };
        setIngredientsList([...ingredientsList, newIngredient]);

        // Reset fields
        setSelectedIngredient('');
        setCustomIngredient('');
        setSelectedQuantity('');
        setUnit('');
        setError('');
    };

    const removeIngredient = (index) => {
        const newList = ingredientsList.filter((_, i) => i !== index);
        setIngredientsList(newList);
    };

    return (
        <div className="ingredientsContainer">
            <div className="combinedField">
                <div className="mainInputs">
                    {/* the selection of ingredients */}
                    <select className="selectInput" value={selectedIngredient} onChange={handleIngredientChange}>
                        <option value="" disabled>Select Ingredient</option>
                        {predefinedIngredients.map((ingredient, index) => (
                            <option key={index} value={ingredient}>{ingredient}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                    {selectedIngredient === 'Other' && (
                        <input
                            type="text"
                            className="customInput"
                            placeholder="Enter Ingredient"
                            value={customIngredient}
                            onChange={handleCustomIngredientChange}
                        />
                    )}
                    <input
                        type="number"
                        className="selectInput"
                        placeholder="Quantity"
                        value={selectedQuantity}
                        onChange={handleQuantityChange}
                    />
                    <select className="selectInput" value={unit} onChange={handleUnitChange}>
                        <option value="" disabled>Select Unit</option>
                        {unitsList.map((unit, index) => (
                            <option key={index} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
                <button className="addButton" onClick={addIngredient}>Add Ingredient</button>
                {error && <p className="error">{error}</p>}
            </div>
            {/* Not Working properly! the list of ingredients */}
            <div className="ingredientsList">
                {ingredientsList.map((item, index) => (
                    <div key={index} className="ingredientItem">
                        <span>{item.ingredient} - {item.quantity} {item.unit}</span>
                        <button className="removeButton" onClick={() => removeIngredient(index)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientsSelectionBox;
