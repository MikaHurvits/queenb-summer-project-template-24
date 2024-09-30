import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import axiosInstance from '../../services/api';
import styles from './FilteredRecipesPage.module.css';

const FilteredRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      try {
        const response = await axiosInstance.get(`/filter${location.search}`);
        setRecipes(response.data.recipes);
      } catch (err) {
        setError('Failed to fetch filtered recipes');
        console.error('Error fetching filtered recipes:', err);
      }
    };
    fetchFilteredRecipes();
  }, [location.search]);

  return (
    <div className={styles.filteredRecipes}>
      {error && <p className={styles.error}>{error}</p>}
      {recipes.length > 0 ? (
        <div className={styles.recipeList}>
          {recipes.map((recipe) => (
            <RecipePreview key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No recipes found for the selected filters</p>
      )}
    </div>
  );
};

export default FilteredRecipesPage;
