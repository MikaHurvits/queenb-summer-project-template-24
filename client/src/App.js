import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import RecipePage from './pages/RecipePage/RecipePage';
import FilteredRecipesPage from './pages/FilteredRecipesPage/FilteredRecipesPage';  // Ensure this path matches the actual file location
// Import the new page component
import AppNav from './components/common/AppNav/AppNav';
import FilterBar from './components/common/FilterBar/FilterBar';
import styles from './styles/App.module.css';

function App() {
  const location = useLocation();

  const currentCategory = location.pathname.includes('/recipes/category/')
    ? location.pathname.split('/').pop()
    : 'all';

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Best Recipes Website</h1>
        <nav className={styles.user}>
          <button className={styles.addButton}>Add Recipe</button>
          <Link to="/saved">Saved🤍</Link>
          <Link to="/">Logout</Link>
        </nav>
      </header>
      <div className={styles.searchAndFilter}>
        <AppNav />
        <span>
          <input placeholder="Search Recipe" />
        </span>
      </div>

      <main className={styles.main}>
        <div className={styles.layoutContainer}>
          <FilterBar category={currentCategory} />
          <div className={styles.contentContainer}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:recipeName" element={<RecipePage />} />
              <Route path="/recipes/category/:title" element={<CategoryPage />} />
              <Route path="/filter" element={<FilteredRecipesPage />} /> {/* Add route for filtered results */}
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

