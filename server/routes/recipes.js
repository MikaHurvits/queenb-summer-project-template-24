const express = require('express');


const requireAuth = require('../middleware/requireAuth'); // Import the middleware

const {
    getAllRecipes,
    getRecipeByName,
    getAllRecipesInCategory,
    addRecipe,
    deleteRecipe
 } = require('../controllers/recipesController')


const router = express.Router();

// GET all recipes (no auth required)
router.get('/', getAllRecipes);

// POST a new recipe (auth required)
router.post('/', requireAuth, addRecipe);

// GET a single recipe by name
router.get('/search', getRecipeByName)

// GET all recipes in category
router.get('/category/:title', getAllRecipesInCategory)

// POST a new recipe
router.post('/', addRecipe);

// DELETE a recipe (auth required)
router.delete('/:id', requireAuth, deleteRecipe);

module.exports = router;
