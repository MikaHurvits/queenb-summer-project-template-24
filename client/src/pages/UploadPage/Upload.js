import './Upload.css';
import React, { useState } from 'react';
import CategorySelection from '../../components/categorySelection/categorySelection';

import IngredientsBox from '../../components/ingredientsBox/ingredientsBox';


const Upload = () => {
    
    const [title, setTitle] = useState('');
    const [selectedCategory, setCategory] = useState('');
    const [totalTime, setTotalTime] = useState('');

    // const [selectedIngredient, setSelectedIngredient] = useState('');
    // const [customIngredient, setCustomIngredient] = useState('');
    // const [selectedQuantity, setSelectedQuantity] = useState('');
    // const [selectedUnit, setSelectedUnit] = useState('');
    // const [customUnit, setCustomUnit] = useState('');

    const [ingredientsList, setIngredientsList] = useState([]);

    const [instructions, setInstructions] = useState('');

    const [image, setImage] = useState(null);

    const [error, setError] = useState('');

// temporary
const imageUrl = '';
const createdBy = 'Mika check';


    const handleCategoryChange = (event) => {
        setCategory(event.target.value); 
      };

      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    // const predefinedIngredients = ['Flour', 'Sugar', 'Butter', 'Eggs'];
    // const unitsList = ['grams', 'cups', 'tablespoons', 'teaspoons'];


    // const handleIngredientChange = async (event) => {
    //     const value = event.target.value;
    //     setSelectedIngredient(value);
    //     if (value !== 'Other') {
    //         setCustomIngredient('');
    //     }
    // };

    // const handleCustomIngredientChange = async (event) => {
    //     setCustomIngredient(event.target.value);
    // };

    // const handleQuantityChange = async (event) => {
    //     const value = event.target.value;
    //     if (value < 0) {
    //         setError('Quantity cannot be negative');
    //     } else if (value === '') {
    //         setError('Quantity is required');
    //     } else {
    //         setError('');
    //     }
    //     setSelectedQuantity(value);
    // };


    // const handleUnitChange = async (event) => {
    //     const value = event.target.value;
    //     setSelectedUnit(value);
    //     if (value !== 'Other') {
    //         setCustomUnit('');
    //     }
    // };

    // const handleCustomUnitChange = async (event) => {
    //     setCustomUnit(event.target.value);
    // };


    // const addIngredient = async () => {
    //     if (!selectedIngredient && !customIngredient) {
    //         setError('Ingredient is required');
    //         return;
    //     }
    //     if (!selectedQuantity) {
    //         setError('Quantity is required');
    //         return;
    //     }
    //     if (!selectedUnit && !customUnit) {
    //         setError('Unit is required');
    //         return;
    //     }

    //     const ingredient = selectedIngredient === 'Other' ? customIngredient : selectedIngredient;
    //     const unit = selectedUnit === 'Other' ? customUnit : selectedUnit;
    //     const newIngredient = { ingredient, quantity: selectedQuantity, unit};
    //     setIngredientsList([...ingredientsList, newIngredient]);

    //     // Reset fields
    //     setSelectedIngredient('');
    //     setCustomIngredient('');
    //     setSelectedQuantity('');
    //     setSelectedUnit('');
    //     setCustomUnit('');
    //     setError('');

    // };


    // const removeIngredient = (index) => {
    //     const newList = ingredientsList.filter((_, i) => i !== index);
    //     setIngredientsList(newList);
    // };


    //edit this function
    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipe = 
        
        {title, selectedCategory, imageUrl, ingredientsList, totalTime, instructions, createdBy}

       
        // const form = e.target;
        // const formData = new FormData(form);

        const response = await fetch('/api/upload', {
            method: 'POST',
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
            // setSelectedIngredient('')
            // setCustomIngredient('')
            // setSelectedQuantity('')
            // setSelectedUnit('')
            // setCustomUnit('')
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
                className='textInput'
                type="text"
                name = "Title"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
                />
            

                < CategorySelection 
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                />


                <div>
                <label>Total time in minutes: </label>
                <input 
                className='textInput'
                type="number"
                name = "totalTime"
                onChange = {(e) => setTotalTime(e.target.value)}
                value = {totalTime}
                />
                </div>


                <IngredientsBox
                ingredientsList={ingredientsList}
                setIngredientsList={setIngredientsList}
                error={error}
                setError={setError}
                />






                {/* <p className='ingredientsContainer'>

                
                <label>Ingredients List: </label>
                <div className='choiceContainer'> 
                <select placeholder="Ingredient " label="Ingredient" value={selectedIngredient} onChange={handleIngredientChange} className='selectBox'>
                    <option style={{color: 'red'}} value="" disabled> Select Ingredient </option>
                    {predefinedIngredients.map((ingredient) => (
                        <option value={ingredient}> {ingredient} </option>
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

                
                </div>
                
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
 */}






                <div className='instructionsBox'>
                <label>Instructions: </label>
                <input 
                className='textInput'
                type="text"
                name = "Instructios"
                onChange = {(e) => setInstructions(e.target.value)}
                value = {instructions}
                />
                </div>



                <div>
                <label>Upload Image: </label>
                <input 
                    type="file"
                    accept="image/*" // Restrict to image files only
                    onChange={handleImageChange}
                />
                </div>





                <hr />
                <button type="reset">Reset form</button>
                <button type="submit">Submit form</button>
                    {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );








}
 
export default Upload;