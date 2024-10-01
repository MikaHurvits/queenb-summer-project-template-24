import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import RecipePage from './pages/RecipePage/RecipePage';
import styles from './styles/App.module.css';
import AppNav from './components/common/AppNav/AppNav';
import FilterBar from './components/common/FilterBar/FilterBar';
import { useAuthContext } from './hooks/useAuthContext';
import { useLogout } from './hooks/useLogout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upload from './pages/UploadPage/Upload';


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
                <Link to="/upload" className={styles.addButton}>Upload</Link> 
                <Link to="/saved" className={styles.appLink}>Saved🤍</Link>
                <button onClick={handleLogout} className={styles.appLink}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.appLink}>Login</Link>
                <Link to="/signup" className={styles.appLink}>Signup</Link>
              </>
            )}
          </nav>
        </header>

        <div className={styles.searchAndFilter}>
          <AppNav />
          <span>
            <input placeholder='Search Recipe' className={styles.searchInput} />
          </span>
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
                
                <Route path="/upload" element={<Upload />} />

              </Routes>
            </div>
            <footer className={styles.footer}>
              <p>&copy; 2024 My App</p>
            </footer>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
