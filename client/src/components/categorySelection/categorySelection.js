import './categorySelection.css';
import React, { useState } from 'react';



const CategorySelection = ({selectedCategory, handleCategoryChange}) => {
    return (
<div>


<fieldset>
<legend>Select Category: </legend>
{/* <p>Select category:</p> */}
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
<br/>
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
<br/>
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
<br/>
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
<br/>
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
<br/>
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


<p>Selected Category: {selectedCategory}</p>
</fieldset> 

</div>

      );
}
 
export default CategorySelection ;

