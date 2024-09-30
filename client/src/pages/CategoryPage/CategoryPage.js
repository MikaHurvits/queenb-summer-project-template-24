import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.css';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import axiosInstance from '../../services/api';


const CategoryPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { title } = useParams();

    useEffect(() => {
        const fetchRecipes = async () => {
          setLoading(true);
            try {
                const response = await axiosInstance.get(`/recipes/category/${title.split(' ').join('')}`);
                setRecipes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch recipes');
                console.error(err);
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [title]);

if (loading) {
  return <img src="/loading.gif" alt="Loading..." className={styles.loading} />;
}

return (
    <div className={styles.category}>
      <div className={styles.recipes}>
        {error && <p className={styles.error}>{error}</p>}
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <RecipePreview className={styles.recipe} key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found in this category</p>
          )}
      </div>

    </div>
  );
};

export default CategoryPage;
