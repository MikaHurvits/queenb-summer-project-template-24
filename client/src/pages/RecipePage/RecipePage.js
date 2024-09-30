import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RecipePage.module.css';
import axiosInstance from '../../services/api';


const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeName } = useParams();

  useEffect(() => {
    const fetchRecipeByName = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/search?name=${encodeURIComponent(recipeName)}`);          
        setRecipe(response.data);
      } catch (error) {
          console.error('Failed to fetch recipe by name', error);
      }
  };

  fetchRecipeByName();
  }, [recipeName]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className={styles.RecipePage}>
      <div className={styles.headerContainer}>
        <h1>{recipe.title}</h1>
        <img src={recipe.imageUrl} alt={recipe.title} />
        {recipe.createdBy ? <p>Created By: {recipe.createdBy.username} </p>: undefined}
        
      </div>
        
      <p><b>Categories: </b>{recipe.categories}</p>
      <p><b>🕑 Prep time: </b>{recipe.totalTime} minutes</p>

      <div className={styles.ingredients}>
        <p><b>Ingredients: </b></p>
        <ul>
          {recipe.ingredients.map(ingredient => <li key={ingredient.ingredient}>{ingredient.quantity + ' ' + ingredient.ingredient}</li>)}
        </ul>
      </div>

      <div className={styles.instructions}>
        <p><b>Instructions: </b></p>
        <ul>
          {recipe.instructions.map(step => <li key={step}>{step}</li>)}
        </ul>
        <p></p>
      </div>
    </div>
  );
};

export default RecipePage;
