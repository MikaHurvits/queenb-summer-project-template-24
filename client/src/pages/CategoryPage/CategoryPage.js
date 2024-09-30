import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.css';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import axiosInstance from '../../services/api';


const CategoryPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const { title } = useParams();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axiosInstance.get(`/recipes/category/${title.split(' ').join('')}`);
                setRecipes(response.data);
            } catch (err) {
                setError('Failed to fetch recipes');
                console.error(err);
            }
        };
        fetchRecipes();
    }, [title]);


return (
    <div className={styles.category}>
      {error && <p className={styles.error}>{error}</p>}
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipePreview className={styles.recipe} key={recipe._id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found in this category</p>
      )}
    </div>
  );
};

export default CategoryPage;
