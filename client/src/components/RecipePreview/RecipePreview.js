import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipePreview.module.css';


// get a partial list of the ingredients to display
function getIngredients(recipe) {
    let result = [];
    let totalLength = 0;
    let fullListIncluded = true;

    for (let ingredient of recipe.ingredients) {
        let ingredientName = ingredient.ingredient;
        // Check if adding this ingredient would exceed the character limit
        if (totalLength + ingredientName.length + result.length <= 50) {
            result.push(ingredientName);
            totalLength += ingredientName.length + result.length;
        } else {
            fullListIncluded = false;
            break;
        }
    }

    if (!fullListIncluded) {
        // If not all ingredients are included and there's enough space, add " .."
        if (totalLength + 3 <= 50) {
            return result.join(', ') + ' ..';
        } else {
            return result.join(', ');
        }
    }

    return result.join(', ');
}

const RecipePreview = ({ recipe }) => {
    const navigate = useNavigate();

    const goToRecipe = () => {
        navigate(`/recipes/${encodeURIComponent(recipe.title)}`);
    };
    
    return (
        <div className={styles.recipe} onClick={goToRecipe}>
            <img src={recipe.imageUrl} alt={recipe.title} className={styles.img} />
            <h2>{recipe.title}</h2>
            <p><b>🕑 Prep time: </b>{recipe.totalTime} minutes</p>
            <p><b>Ingredients: </b>{getIngredients(recipe)}</p>
        </div>
    )
};

export default RecipePreview;