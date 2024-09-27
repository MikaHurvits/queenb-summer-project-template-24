const express = require('express');
const Recipe = require('../models/RecipeModel');
const e = require('express');


const router = express.Router();


router.post('/', async (req, res) => {
    const { title, categories, imageUrl, ingredients, totalTime, instructions, createdBy } = req.body;

    try{
        const recipe = await Recipe.create({ title, categories, imageUrl, ingredients, totalTime, instructions, createdBy });
        res.status(200).json(recipe);


    }
    catch(error){
        res.status(400).json({error: error.message})

    }
    res.json({mssg: 'upload successful'})
    console.log(req.body)
    res.send('upload successful')
}
)


module.exports = router;