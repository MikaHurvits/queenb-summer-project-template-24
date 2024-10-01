import './Upload.css';
import React, { useState } from 'react';
import CategorySelection from '../../components/categorySelection/categorySelection';
import axios from 'axios';
import IngredientsBox from '../../components/IngredientsBox/IngredientsBox';
import { useNavigate } from 'react-router-dom';



const Upload = () => {
    const [title, setTitle] = useState('');
    const [selectedCategory, setCategory] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const createdBy = null; //currently fixed on null but had to be set dynamically later on
    
    const navigate = useNavigate();

const validateForm = () => {
    if (!title) return 'Title is required';
    if (!selectedCategory) return 'Category is required';
    if (!totalTime) return 'Total time is required';
    if (!ingredientsList.length) return 'Ingredients list is required';
    if (!instructions) return 'Instructions are required';
    if (!imageUrl) return 'Image URL is required';
    return null;
};

    const handleCategoryChange = (event) => {
        setCategory(event.target.value); 
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccessMessage(''); 

        const validationError = validateForm();
            if (validationError) {
                setError(validationError);
                return;
            } else {
                console.log('form data validated on client side');
            }
        

        const recipe = {"title": title,
            "categories": [
                selectedCategory
            ],
            "imageUrl": imageUrl,
            "ingredients": ingredientsList,

            "totalTime": totalTime,
            "instructions": [
                instructions
            ],
            "createdBy": null }
    
            axios.post(`${process.env.REACT_APP_API_URL}/upload`, recipe)
            .then(response => {
                console.log('Response:', response.data);
                setSuccessMessage('Upload successful!');
                setCategory('');
                setTitle('');
                setTotalTime('');
                setIngredientsList([]);
                setInstructions('');
                setImageUrl('');
        
                navigate('/');
            })
            .catch(err => {
                
                console.error('Error occurred during upload:', err);
                if (err.response && err.response.status === 400) {
                    setError('Bad request - Please check the form fields.');
                } else if (err.response && err.response.status === 500) {
                    setError('Server error - Please try again later.');
                } else {
                    setError('An unknown error occurred.');
                }
        
            });
        
    };
    

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



                <div className='instructionsBoxContainer'>
                    <label>Instructions: </label>
                    <textarea 
                        className='instructionsBox'
                        name="Instructions"
                        rows="7" 
                        onChange={(e) => setInstructions(e.target.value)}
                        value={instructions}
                    />
                </div>



                <div>
                <label>Image URL: </label>
                <input 
                    type="text"
                    name="imageUrl"
                    placeholder="Enter image URL"
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                />
            </div>

                <hr />
            <button type="reset">Reset form</button>
            <button type="submit">Submit form</button>
            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
            </form>
        </div>
    );
};
 
export default Upload;