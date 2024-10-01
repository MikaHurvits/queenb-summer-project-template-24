const express = require('express');
const Recipe = require('../models/RecipeModel');
const { createRecipe } = require('../controllers/uploadController');




const router = express.Router();

// router.post('/',createRecipe);
router.post('/', async (req, res) => {
    const { title, categories, imageUrl, ingredients, totalTime, instructions, createdBy } = req.body;

    console.log('Request Body:', req.body);

    try{
        const recipe = await Recipe.create({ title, categories, imageUrl, ingredients, totalTime, instructions, createdBy });
        res.status(200).json(recipe);
        return


    }
    catch(error){
        res.status(400).json({error: error.message})
        return 

    }
    res.json({mssg: 'upload successful'})
    console.log(req.body)
    // res.send('upload successful')
}
)


module.exports = router;