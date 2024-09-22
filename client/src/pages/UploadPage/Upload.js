import './Upload.css';
import React, { useState } from 'react';

const Upload = () => {
    
    const [title, setTitle] = useState('');
    const [selectedCategory, setCategory] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [customIngredient, setCustomIngredient] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [customUnit, setCustomUnit] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    const [instructions, setInstructions] = useState('');

    const [error, setError] = useState('');

// temporary
const imageUrl = '';
const createdBy = 'Mika check';



    const handleCategoryChange = (event) => {
        setCategory(event.target.value); 
      };


    const predefinedIngredients = ['Flour', 'Sugar', 'Butter', 'Eggs'];
    const unitsList = ['grams', 'cups', 'tablespoons', 'teaspoons'];


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


    const addIngredient = async () => {
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
        const newIngredient = { ingredient, quantity: selectedQuantity, unit};
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


    //edit this function
    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipe = {title, selectedCategory, imageUrl, ingredientsList, totalTime, instructions, createdBy}

       
        // const form = e.target;
        // const formData = new FormData(form);

        const response = await fetch('/api/upload', {
            method: 'POST',
            // method: form.method,
            body: JSON.stringify(recipe),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setCategory('')
            setTitle('')
            setTotalTime('')
            setSelectedIngredient('')
            setCustomIngredient('')
            setSelectedQuantity('')
            setSelectedUnit('')
            setCustomUnit('')
            setIngredientsList([])
            setInstructions('')

            setError(null)
            console.log('new recipe added', json)
        } 




        // const formJason = Object.fromEntries(formData.entries());
        // console.log(formJason);
        // console.log([...formData.entries()]);
        
    }





    return (  

        <div>

        
            
            <form className="form" onSubmit={handleSubmit}>

                <h1 className="title">Upload New Recipe</h1>
                
                <label>Recipe Title: </label>
                <input 
                type="text"
                name = "Title"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
                />


            <p>Select category:</p>
                <label>
                    <input
                    type="radio"
                    name="Category"
                    value="Appetizer"
                    checked={selectedCategory === "Appetizer"} // Set checked status
                    onChange={handleCategoryChange}
                    />
                    Appetizer
                </label>
                <label>
                    <input
                    type="radio"
                    name="Category"
                    value="Soup"
                    checked={selectedCategory === "Soup"}
                    onChange={handleCategoryChange}
                    />
                    Soup
                </label>
                <label>
                    <input
                    type="radio"
                    name="Category"
                    value="Salad"
                    checked={selectedCategory === "Salad"}
                    onChange={handleCategoryChange}
                    />
                    Salad
                </label>
                <label>
                    <input
                    type="radio"
                    name="Category"
                    value="Main Course"
                    checked={selectedCategory === "Main Course"}
                    onChange={handleCategoryChange}
                    />
                    Main Course
                </label>
                <label>
                    <input
                    type="radio"
                    name="Category"
                    value="Side Dish"
                    checked={selectedCategory === "Side Dish"}
                    onChange={handleCategoryChange}
                    />
                    Side Dish
                </label>
                <label>
                    <input
                    type="radio"
                    name="Category"
                    value="Dessert"
                    checked={selectedCategory === "Dessert"}
                    onChange={handleCategoryChange}
                    />
                    Dessert
                </label>

                {/* Display the selected category */}
                <p>Selected Category: {selectedCategory}</p>



                <p>
                <label>Total time in minutes: </label>
                <input 
                type="number"
                name = "totalTime"
                onChange = {(e) => setTotalTime(e.target.value)}
                value = {totalTime}
                />
                </p>

                <p className='ingredientsContainer'>

                {/* <div className="ingredientsContainer"> */}
                
                <label>Ingredients List: </label>
                <select placeholder="Ingredient " label="Ingredient" value={selectedIngredient} onChange={handleIngredientChange}>
                    <option style={{color: 'red'}} value="" disabled> Select Ingredient </option>
                    {predefinedIngredients.map((ingredient) => (
                        <option value={ingredient}> {ingredient} </option>
                    ))}
                    <option value="Other">Other</option>
                </select>
                {selectedIngredient === 'Other' && (
                    <input
                        type="text"
                        placeholder="Enter Ingredient"
                        value={customIngredient}
                        onChange={handleCustomIngredientChange}
                    />
                )}

                <input
                
                    type="number"
                    label="Quantity"
                    placeholder="Quantity"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                />
 
                {/* <label>Select Unit: </label> */}
                <select value={selectedUnit} onChange={handleUnitChange}>
                    <option value="" disabled> Select Unit</option>
                    {unitsList.map((unit) => (
                        <option value={unit}>{unit}</option>
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

                <div className='ingredientsList'>
                    {ingredientsList.map((item, index) => (
                        <div className='ingredientItem'>    
                            <p>{item.quantity} {item.unit} of {item.ingredient} 
                                <button className="removeButton" onClick={() => removeIngredient(index)}>Remove</button>
                            </p>
                        </div>
                    ))}
                </div>
                </p>
       
                <p>
                <label>Instructions: </label>
                    <input 
                    type="text"
                    className='instructionBox'
                    name="Instructions"
                    onChange = {(e) => setInstructions(e.target.value)}
                    value = {instructions}
                    />
                </p>


                {/*needs to add an image alss*/}
                <hr />
                <button type="reset">Reset form</button>
                <button type="submit">Submit form</button>
                    {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );








}
 
export default Upload;