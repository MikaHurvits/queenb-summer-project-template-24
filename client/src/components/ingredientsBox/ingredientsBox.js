import React, { useState } from 'react';

const IngredientsBox  = ({ingredientsList, setIngredientsList, error, setError}) => {

    const predefinedIngredients = ['Flour', 'Sugar', 'Butter', 'Eggs'];
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [customIngredient, setCustomIngredient] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState('');
    
    const handleIngredientChange = async (event) => {
        const value = event.target.value;
        setSelectedIngredient(value);
        if (value !== 'Other') {
            setCustomIngredient('');
        }
    };

    const handleCustomIngredientChange = async (event) => {
        setCustomIngredient(event.target.value);
    };

    const handleQuantityChange = async (event) => {
        const value = event.target.value;
        setSelectedQuantity(value);
    };

    const addIngredient = async (e) => {
        e.preventDefault();
        if (!selectedIngredient && !customIngredient) {
            setError('Ingredient is required');
            return;
        }
        if (!selectedQuantity) {
            setError('Quantity is required');
            return;
        }
        const ingredient = selectedIngredient === 'Other' ? customIngredient : selectedIngredient;
        const quantity = selectedQuantity;
        const _id = "66f08903c2d0b395b32bd75f" //currently fixed but has to be set dynamically later on 
        const newIngredient = { ingredient, quantity, _id}
        
        setIngredientsList([...ingredientsList, newIngredient]);

        // Reset fields
        setSelectedIngredient('');
        setCustomIngredient('');
        setSelectedQuantity('');
        setError('');

    };


    const removeIngredient = (index) => {
        const newList = ingredientsList.filter((_, i) => i !== index);
        setIngredientsList(newList);
    };


    return (
                <div className='ingredientsContainer'>
                <label>Ingredients List: </label>
                <div className='choiceContainer'> 
                <select placeholder="Ingredient " label="Ingredient" value={selectedIngredient} onChange={handleIngredientChange} className='selectBox'>
                    <option value="" disabled> Select Ingredient </option>
                    {predefinedIngredients.map((ingredient, index) => (
                        <option key={index} value={ingredient}> {ingredient} </option>
                    ))}
                    <option value="Other">Other</option>
                </select>

                {selectedIngredient === 'Other' && (
                    <input
                        className='selectBox'
                        type="text"
                        placeholder="Enter Ingredient"
                        value={customIngredient}
                        onChange={handleCustomIngredientChange}
                    />
                )}

                <input
                    className='smallTextBox'
                    type="text"
                    label="Quantity"
                    placeholder="Quantity"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                />

                <button onClick={addIngredient}>Add Ingredient</button>
                {error && <p>{error}</p>}

                </div>

                <div className='ingredientsList'>
                    {ingredientsList.map((item, index) => (
                        <div key={index} className='ingredientItem'>    
                            <p>{item.quantity} of {item.ingredient} 
                                <button className="removeButton" onClick={() => removeIngredient(index)}>Remove</button>
                            </p>
                        </div>
                    ))}
                </div>


                </div>
            );
}
 
export default IngredientsBox;