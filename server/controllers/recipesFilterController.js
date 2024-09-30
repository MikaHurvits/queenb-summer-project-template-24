const Recipe = require('../models/RecipeModel');
const Ingredient = require('../models/IngredientModel');

// Get all recipes by certain ingredient
const getRecepiesByIngredients = async (req, res) => {
  try {
    const { ingredients, category } = req.query;  
    // Filter only by category - No ingredients were provided
    if (!ingredients) { 
      const recipes = await Recipe.find();
      const filteredRecipes = recipes.filter(recipe => recipe.categories.includes(category));
      return res.status(200).json({ recipes: filteredRecipes });
    }

    // Filter by provided ingredients
    const ingredientsList = ingredients.split(',');
    const foundIngredients = await Ingredient.find({ ingredient: { $in: ingredientsList } }).populate('recipes');

    if (foundIngredients.length === 0) {
      return res.status(404).json({ message: 'No recipes found for the given ingredients' });
    }

    // Collect recipe IDs from the found ingredients
    let recipeIds = [];
    foundIngredients.forEach(ingredient => {
      recipeIds = recipeIds.concat(ingredient.recipes);
    });

    recipeIds = [...new Set(recipeIds)];

    const filteredRecipes = await Recipe.find({
      _id: { $in: recipeIds },
      'ingredients.ingredient': { $all: ingredientsList } 
    });

    if (filteredRecipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found with all specified ingredients' });
    }

    let finalRecipes = filteredRecipes;
    if (category) {
      finalRecipes = filteredRecipes.filter(recipe => recipe.categories.includes(category)); 
    }

    return res.status(200).json({ recipes: finalRecipes });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRecepiesByIngredients
};
