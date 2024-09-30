import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import axiosInstance from '../../services/api'

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipes');
        setRecipes(response.data.recipes);
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  
  return (
    <div className={styles.home}>
      {error && <p className={styles.error}>{error}</p>}
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipePreview key={recipe._id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default Home;
