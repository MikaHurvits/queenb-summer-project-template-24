import './Upload.css';
import React, { useState } from 'react';
import CategorySelection from '../../components/categorySelection/categorySelection';
import axios from 'axios';

import IngredientsBox from '../../components/IngredientsBox/IngredientsBox';



const Upload = () => {
    
    const [title, setTitle] = useState('');
    const [selectedCategory, setCategory] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const [ingredientsList, setIngredientsList] = useState([]);

    const [instructions, setInstructions] = useState('');

    const [imageUrl, setImageUrl] = useState('');

    const [error, setError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

// temporary
// const imageUrl = '';
const createdBy = 'Mika check';


    const handleCategoryChange = (event) => {
        setCategory(event.target.value); 
      };

      const handleImageChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccessMessage(''); 
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', selectedCategory);
        formData.append('totalTime', totalTime);
        formData.append('ingredientsList', JSON.stringify(ingredientsList));
        formData.append('instructions', instructions);
        formData.append('imageUrl', imageUrl); 
        formData.append('createdBy', createdBy); 


        const recipe = {
             title: title,
             category: selectedCategory,
             totalTime: totalTime,
             ingredientsList: ingredientsList,
             instructions: instructions,
             imageUrl: imageUrl,
             createdBy: createdBy,
        };
    

        console.log(formData);
        // Log form data to console
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        console.log(typeof formData); // This will print "object"
        console.log(typeof JSON.stringify(formData));
        console.log(`${process.env.REACT_APP_API_URL}/upload`);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Send FormData directly
            });
            // const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, recipe, {
            //     headers: {
            //         // 'Content-Type': 'multipart/form-data',
            //         'Content-Type': 'application/json',
            //     }
            // });


            console.log(response);

            if (!response.ok){
                const errorText = await response.text();
                console.error('Upload failed:', errorText);
                setError('Upload failed: ' + errorText);
                return;
            }

    
            const json = await response.json();
            setSuccessMessage('Upload successful!');
            // Clear form fields
            setCategory('');
            setTitle('');
            setTotalTime('');
            setIngredientsList([]);
            setInstructions('');
            setImageUrl('');

        } catch (error) {
            console.error('Error uploading data:', error);
            setError(error.message || 'Error uploading data');
        }
    };
    
    // Change the button type to submit
    //<button type="submit">Submit form</button>

   
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError(''); 
    //     setSuccessMessage(''); 

    // {**/
    //     const formData = {
    //         title,
    //         category: selectedCategory,
    //         totalTime,
    //         ingredientsList,
    //         instructions,
    //         imageUrl: image,
    //     };

    //     const recipe = {
    //         title,
    //         category: selectedCategory,
    //         totalTime,
    //         ingredientsList,
    //         instructions,
    //         imageUrl: image,
    //     };
    // */}

    //     try {
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(recipe),
    //         });
    //         const json = await response.json();
    //         if (response.ok) {
    //             setSuccessMessage('Upload successful!');
    //             // Clear form fields
    //             setCategory('');
    //             setTitle('');
    //             setTotalTime('');
    //             setIngredientsList([]);
    //             setInstructions('');
    //             setImage('');
    //         } else {
    //             console.error('Upload failed');
    //             setError(json.error || 'Upload failed');

    //     };
    // }
    //     catch (error) {
    //         console.log('mika')
    //         console.error('Error uploading data:', error);
    //         setError(error.message || 'Error uploading data');
    //     }
    // };



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
                        rows="7" // Adjust the number of rows as needed
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
            {/* <button type="button" onClick={handleSubmit}>Submit form</button> */}
                    {error && <div className='error'>{error}</div>}
                    {successMessage && <div className='success'>{successMessage}</div>}
            </form>
        </div>
    );
};
 
export default Upload;