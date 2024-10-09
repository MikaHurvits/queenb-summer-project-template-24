const express = require('express')

// controller functions
const { loginUser, signupUser, saveRecipe, fetchSavedRecipes } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// save recipe route
router.post('/saveRecipe', saveRecipe)

// fetch saved recipes route
router.get('/savedRecipes', fetchSavedRecipes)

module.exports = router