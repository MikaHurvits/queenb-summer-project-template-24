const Recipe = require('../models/RecipeModel');


// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({recipes});
    } catch (err) {
        res.status(400).json({msg: 'Error getting recipes', err})
    }
}


// Add a new recipe
const addRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body);
    
    try {
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe); // 201 status for resource creation
    } catch (err) {
        res.status(400).json({ msg: 'Error adding recipe', err });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) return res.status(404).json({ msg: 'Recipe not found' });
        
        res.status(200).json({ msg: 'Recipe deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error while deleting recipe', err });
    }
};


module.exports = {
    getAllRecipes,
    addRecipe,
    deleteRecipe
}