import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext to get user info
import styles from './SavedPage.module.css';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import axiosInstance from '../../services/api';

const SavedPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext); // Get user context

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            if (!user) {
                setError('You must be logged in to view saved recipes.');
                return;
            }
            try {
                const response = await axiosInstance.get(`/user/savedRecipes`); // Fetch saved recipes
                setRecipes(response.data);
            } catch (err) {
                setError('Failed to fetch saved recipes' + err);
                console.error(err);
            }
        };
        fetchSavedRecipes();
    }, [user]);

    return (
        <div className={styles.saved}>
            {error && <p className={styles.error}>{error}</p>}
            {recipes.length > 0 ? (
                recipes.map(recipe => (
                    <RecipePreview className={styles.recipe} key={recipe._id} recipe={recipe} />
                ))
            ) : (
                <p>No saved recipes found</p>
            )}
        </div>
    );
};

export default SavedPage;
