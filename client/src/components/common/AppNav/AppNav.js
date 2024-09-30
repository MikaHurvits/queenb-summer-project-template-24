import React from "react";
import styles from './AppNav.module.css';
import { useLocation, Link } from "react-router-dom";

const categories = [
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'soups', name: 'Soups' },
    { id: 'salads', name: 'Salads' },
    { id: 'mainCourses', name: 'Main Courses' },
    { id: 'sideDishes', name: 'Side Dishes' },
    { id: 'desserts', name: 'Desserts' }
  ];

const AppNav = () => {
    const location = useLocation();

    return (
        <div className={styles.appNav}>
            <nav className={styles.categories}>
                <Link to="/" className={`${styles.appLink} ${location.pathname === '/' ? styles.active : ''}`}>
                    All
                </Link>
                {categories.map((category) => (
                    <Link key={category.id} to={`recipes/category/${category.name.split(' ').join('')}`} className={`${styles.appLink} ${location.pathname === `/${category.id}` ? styles.active : ''}`}>
                        {category.name}
                    </Link>
                ))}
            </nav>
      </div>
    )
}

export default AppNav;