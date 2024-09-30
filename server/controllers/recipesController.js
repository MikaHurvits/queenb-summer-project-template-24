const Recipe = require('../models/RecipeModel');
const Category = require('../models/CategoryModel');


// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({recipes});
    } catch (err) {
        res.status(400).json({msg: 'Error getting recipes', err})
    }
}


// Get a single recipe by name
const getRecipeByName = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ title: req.query.name });
        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching recipe', err });
    }
};


// GET all recipes in the category
const getAllRecipesInCategory = async (req, res) => {
    console.log("Searching for category:", req.params.title);
    try {
        const titleRegex = req.params.title.split('').join('\\s*').replace(/\s+/g, '\\s*');
        const category = await Category.findOne({
            title: {
              $regex: new RegExp("^" + titleRegex + "$", "i")
            }
          }).populate('recipes');
        if (!category) {
            console.log("Category not found");
            return res.status(404).json({ msg: 'Category not found' });
        }
        console.log("Category found, recipes count:", category.recipes.length);
        res.status(200).json(category.recipes);
    } catch (err) {
        console.error("Error in fetching category:", err);
        res.status(500).json({ msg: 'Error getting recipes', err });
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
    getRecipeByName,
    getAllRecipesInCategory,
    addRecipe,
    deleteRecipe
}