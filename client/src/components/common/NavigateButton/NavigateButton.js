import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavigateButton.module.css';

const NavigateButton = () => {
    const navigate = useNavigate();

    const handleNavigateToUpload = () => {
        navigate('/upload');
    };

    return (
        <button className={styles.addButton} onClick={handleNavigateToUpload}>Add Recipe</button>
    );
};

export default NavigateButton;