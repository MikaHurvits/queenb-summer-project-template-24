const Recipe = require('../models/RecipeModel');
const Category = require('../models/CategoryModel');
const Ingredient = require('../models/IngredientModel');
const User = require('../models/UserModel');


// creating a new recipe for the Recipes Collection



const createRecipe = async (req, res) => {

    try{
        const { title, categories, imageUrl, ingredients, totalTime, instructions, createdBy } = req.body;
    
        const recipe = await Recipe.create({ title, categories, imageUrl, ingredients, totalTime, instructions, createdBy });

        const categoryName = req.body.Category;
        await 
        Category.findOneAndUpdate(categoryName, {
            $push: {recipes: recipe._id}
        });
        res.status(200).json({message: 'recipe added and Category updated', recipe:recipe});
}

catch(error){
    res.status(400).json({error: error.message})
}




}


// updating the suitable ducument it the Category Model. 
// i.e. adding the recipe name to the list of it's category 



// updating every ingredient ducument it the Ingredient Model. 
// i.e. adding the recipe name to the list of each of it's ingredients



// updating the suitable ducument it the User Model. 
// i.e. adding the recipe name to the list of 'created' of this specific user (the createdBy field)


module.exports = {
    createRecipe
}