const fs = require('fs');
const path = require('path');
const Recipe = require('../models/RecipeModel');
const Category = require('../models/CategoryModel');
const Ingredient = require('../models/IngredientModel');

class RecipeManager {
  static baseDir = `${process.cwd()}/Data`;
  static jsonDataFileSuffix = 'Data.json';
  static jsonFileSuffix = '.json';

  // Add recipes data to database
  static async initializeRecipesDatabase() {
    try {
      const categoriesTitles = RecipeManager.getCategories();

      for (const categoryTitle of categoriesTitles) {
        let category = await RecipeManager.checkIfCategoryExists(categoryTitle);
        
        const recipesTitles = RecipeManager.getRecipes(categoryTitle);
        let isCategoryChanged = false;

        for (const recipeTitle of recipesTitles) {
          if (!await RecipeManager.exists(recipeTitle)) {
            const recipeToInsert = RecipeManager.getRecipe(recipeTitle, categoryTitle);
            const savedRecipe = await RecipeManager.insertRecipe(recipeToInsert);
          
            // Add the recipe ID to the category's recipes array
            category.recipes.push(savedRecipe._id);
            isCategoryChanged = true;
            console.log(`Recipe: ${recipeToInsert.title} is going to pushed to ${categoryTitle}'s recipes`);
            
            await RecipeManager.initializeIngredients(recipeToInsert, savedRecipe._id);
          }
        }
        if (isCategoryChanged) {
          // Save the updated category with the new recipes
          await category.save();
          console.log('Category saved successfully:', category.title);
        }
      }
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);
    }
  }
  // Get categories from json file
  static getCategories() {
    try {
      const jsonPath = `${RecipeManager.baseDir}/${RecipeManager.jsonDataFileSuffix}`; //"Data/Data.json"
      const jsonFileData = RecipeManager.readJsonFile(jsonPath);
  
      if (jsonFileData === null) {
        return null;
      }
      const items = jsonFileData.Items;
      return Array.isArray(items) ? items : [];
  
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return [];
    }
  }

  // Check if category exists and create it if not
  static async checkIfCategoryExists(categoryTitle) {
    let category = await Category.findOne({ title: categoryTitle });

    if (!category) {
      category = new Category({ title: categoryTitle });
      await category.save(); // Save the new category
      console.log('Category title saved successfully:', category.title);
    }
    
    return category;
  }

  // Get recipes from json file
  static getRecipes(categoryTitle) {
    try {
      const jsonPath = `${RecipeManager.baseDir}/${categoryTitle}/${RecipeManager.jsonDataFileSuffix}`; //"Data/{categoryTitle}/Data.json"
      const jsonFileData = RecipeManager.readJsonFile(jsonPath);
  
      if (jsonFileData === null) {
        return null;
      }
      const items = jsonFileData.Items;
      return Array.isArray(items) ? items : [];
  
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return [];
    }
  }

  // Get recipe object from json file
  static getRecipe(recipeTitle, categoryTitle) {
    try {
      const jsonPath = `${RecipeManager.baseDir}/${categoryTitle}/${recipeTitle}${RecipeManager.jsonFileSuffix}`; //"Data/{categoryTitle}/{recipeTitle}.json"
      const jsonFileData = RecipeManager.readJsonFile(jsonPath);
    
      if (jsonFileData === null) {
        return null;
      }
  
      const recipe = new Recipe({
        id: jsonFileData._id || '',
        title: jsonFileData.title || '',
        categories: jsonFileData.categories || [],
        imageUrl: jsonFileData.imageUrl || '',
        ingredients: (jsonFileData.ingredients || []).map(ing => ({
          ingredient: ing.ingredient || '',
          quantity: ing.quantity || ''
        })),
        totalTime: jsonFileData.totalTime || 0,
        instructions: jsonFileData.instructions || [],
        createdBy: jsonFileData.createdBy || null
      });
      
      return recipe;
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return null;
    }
  }
  
  // Read json file
  static readJsonFile(filePath) {
    const jsonContent = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(jsonContent);
  }

  // Check if recipe exists already in database
  static async exists(recipeTitle) {
    try {
      const existingRecipe = await Recipe.findOne({ title: recipeTitle });
      
      return !!existingRecipe; // If existingRecipe is truthy (not null, undefined, 0, false, or an empty string), !!existingRecipe will return true
    } catch (error) {
      console.error('Error checking if recipe exists:', error);

      return false;
    }
  }

  // Insert recipe to database
  static async insertRecipe(recipeToInsert) {
    try {
      //const savedRecipe = await Recipe.insertOne(recipeToInsert);
      const savedRecipe = await recipeToInsert.save();

      console.log('Recipe saved successfully:', savedRecipe.title);

      return savedRecipe;
    } catch (err) {
      console.error(`Error saving recipe "${recipeToInsert.title}":`, err);
      // Optionally: throw err; // Re-throw if you want calling code to handle it

      throw err; // Added to re-throw the error
    }
  }
  // Initialize ingredients
  static async initializeIngredients(recipeToInsert, idRecipe) {
    for (const ingredient of recipeToInsert.ingredients) {
      let existingIngredient = await Ingredient.findOne({ ingredient: ingredient.ingredient }); // Use ingredient.ingredient
      if (!existingIngredient) {
        existingIngredient = new Ingredient({ ingredient: ingredient.ingredient }); // Use ingredient.ingredient
        await existingIngredient.save(); // Save the new ingredient
        console.log('Ingredient name saved successfully:', existingIngredient.ingredient);
      }
      // Add the recipe ID to the ingredient's recipes array
      existingIngredient.recipes.push(idRecipe);
      await existingIngredient.save(); // Save the updated ingredient
      console.log(`Recipe: ${recipeToInsert.title} was pushed to ${ingredient.ingredient}'s recipes and saved successfully`); // Use ingredient.ingredient
    }
  }
}

module.exports = RecipeManager;
