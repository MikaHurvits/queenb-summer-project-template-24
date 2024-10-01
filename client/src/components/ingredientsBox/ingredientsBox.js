
import React, { useState } from 'react';


const IngredientsBox  = ({ingredientsList, setIngredientsList, error, setError}) => {

    const predefinedIngredients = ['Flour', 'Sugar', 'Butter', 'Eggs'];
    const unitsList = ['grams', 'cups', 'tablespoons', 'teaspoons'];

    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [customIngredient, setCustomIngredient] = useState('');
    
    const [selectedQuantity, setSelectedQuantity] = useState('');
    
    const [selectedUnit, setSelectedUnit] = useState('');
    const [customUnit, setCustomUnit] = useState('');

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
        if (value < 0) {
            setError('Quantity cannot be negative');
        } else if (value === '') {
            setError('Quantity is required');
        } else {
            setError('');
        }
        setSelectedQuantity(value);
    };


    const handleUnitChange = async (event) => {
        const value = event.target.value;
        setSelectedUnit(value);
        if (value !== 'Other') {
            setCustomUnit('');
        }
    };

    const handleCustomUnitChange = async (event) => {
        setCustomUnit(event.target.value);
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
        if (!selectedUnit && !customUnit) {
            setError('Unit is required');
            return;
        }

        const ingredient = selectedIngredient === 'Other' ? customIngredient : selectedIngredient;
        const unit = selectedUnit === 'Other' ? customUnit : selectedUnit;
        const quantity = selectedQuantity.toString(); // Convert quantity to string if needed
        const newIngredient = { ingredient, quantity, unit};
        
        setIngredientsList([...ingredientsList, newIngredient]);

        // Reset fields
        setSelectedIngredient('');
        setCustomIngredient('');
        setSelectedQuantity('');
        setSelectedUnit('');
        setCustomUnit('');
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
                    <option style={{color: 'red'}} value="" disabled> Select Ingredient </option>
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
                    type="number"
                    label="Quantity"
                    placeholder="Quantity"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                />
 
                

                <select value={selectedUnit} onChange={handleUnitChange} className='selectBox'>
                    <option value="" disabled> Select Unit</option>
                    {unitsList.map((unit, index) => (
                        <option key={index} value={unit}>{unit}</option>
                    ))}
                    <option value="Other">Other</option>
                </select>
                {selectedUnit === "Other" && (
                    <input
                        type="text"
                        placeholder="Enter Unit"
                        value={customUnit}
                        onChange={handleCustomUnitChange}
                    />
                )}




                <button onClick={addIngredient}>Add Ingredient</button>
                {error && <p>{error}</p>}

                {/* </div> */}
                </div>

                <div className='ingredientsList'>
                    {ingredientsList.map((item, index) => (
                        <div key={index} className='ingredientItem'>    
                            <p>{item.quantity} {item.unit} of {item.ingredient} 
                                <button className="removeButton" onClick={() => removeIngredient(index)}>Remove</button>
                            </p>
                        </div>
                    ))}
                </div>


                </div>
            );
}
 
export default IngredientsBox;