import React from 'react';
<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import SearchBar from './components/common/SearchBar/SearchBar';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import RecipePage from './pages/RecipePage/RecipePage';
import styles from './styles/App.module.css';
import AppNav from './components/common/AppNav/AppNav';
import FilterBar from './components/common/FilterBar/FilterBar';
import { useAuthContext } from './hooks/useAuthContext';
import { useLogout } from './hooks/useLogout';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1 className={styles.headline}>Best Recipes Website</h1>
          <nav className={styles.userNav}>
            {user ? (
              <>
                <Link to="/" className={styles.appLink}>Home</Link>
                <button className={styles.addButton}>Add Recipe</button>
                <Link to="/saved" className={styles.appLink}>Saved🤍</Link>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.appLink}>Login</Link>
                <Link to="/signup" className={styles.appLink}>Signup</Link>
              </>
            )}
          </nav>
        </header>

        <div className={styles.searchBar}>
          <AppNav />
          <div>
            <SearchBar />
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.leftSide}></div> {/* Left pink section */}
          <div className={styles.layoutContainer}>
            <FilterBar />
            <div className={styles.contentContainer}>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/recipes/:recipeName" element={<RecipePage />} />
                <Route path="/recipes/category/:title" element={<CategoryPage />} />

              </Routes>
            </div>
            <footer className={styles.footer}>
              <p>&copy; 2024 My App</p>
            </footer>
          </div>
        </main>
>>>>>>> 59b495e0857ff92d2f0da76e7048e17984079296
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

