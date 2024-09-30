const express = require('express');
const {
    searchRecipes
 } = require('../controllers/searchBarController')

const router = express.Router()

// GET recipes by search key
router.get('/', searchRecipes)

// // POST a new recipe
// router.post('/', addRecipe);

// // DELETE a recipe
// router.delete('/:id', deleteRecipe);

module.exports = router