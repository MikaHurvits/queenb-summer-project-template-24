import IngredientsSelectionBox from './IngredientsSelectionBox';
import './styles/Upload.css';
import React, { useState } from 'react';

const Upload = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (  
        <div className="container">
            <h1 className="title">Upload</h1>
            
            <form className="form">
                <input type="text" className="textInput" placeholder="Title:" />
                
                <select className="selectInput" value={selectedOption} onChange={handleSelectChange}>
                    <option value="" disabled>Select Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Soup">Soup</option>
                    <option value="Salad">Salad</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Dessert">Dessert</option>
                </select>
                
                <input type="number" className="textInput" placeholder="Total time in minutes"/>
                
                <IngredientsSelectionBox />
                
                <button className="uploadButton">Upload</button>
            </form>
        </div>
    );
}
 
export default Upload;