import styles from './SearchBar.module.css';
import { useEffect, useState, useRef } from "react";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/api'

function SearchBar() {
  // State for search results, input value, and loading state
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate(); //useNavigate hook, to navigate to a different page on click each recipe
  // Refs for managing search results and latest search key
  const searchResultRef = useRef(null);
  const latestKeyRef = useRef("");

  // Handler for clicking on a recipe in search results
  const handleRecipeClick = (recipe) => {
    setKey(recipe.title); // Set the search bar value to the selected recipe title
    //setSearchResult([]); // Clear the search results
    if (searchResultRef.current) {
      searchResultRef.current.style.display = "none";
    }
    console.log("Navigating to:", recipe.title); // Debugging line
    navigate(`/recipes/${encodeURIComponent(recipe.title)}`);
  };

  const handleClearInput = () => {
    setKey(""); // Clear the input field
    //setSearchResult([]); // Optionally clear search results
  };

  const handleSearchBarClick = () => {
    if (searchResultRef.current) {
      searchResultRef.current.style.display = "block";
    }
  }

  // Reset scroll position when input loses focus
  const handleInputBlur = () => {
    if (searchResultRef.current) {
      searchResultRef.current.scrollTop = 0;
    }
  };

  // Highlight matching text in search results
  const highlightMatch = (text, key) => {
    if (!key) return text;
    const parts = text.split(new RegExp(`(${key})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === key.toLowerCase() ? 
        <span key={index} className={styles.highlight}>{part}</span> : part
    );
  };

  // Perform search API call
  const performSearch = async (searchKey) => {
    setIsSearching(true);
    try {
      if (!searchKey.trim()) {
        setSearchResult([]);
        return;
      }
      const response = await axiosInstance.get('/searchBar', {params: {key: searchKey}});
      const searchResults = response.data.map(recipe => highlightMatch(recipe.title, searchKey));
      setSearchResult(searchResults);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsSearching(false);
      // Check if the key has changed during the search
      if (latestKeyRef.current !== searchKey) {
        performSearch(latestKeyRef.current);
      }
    }
  };

  // Effect to trigger search when input changes
  useEffect(() => {
    latestKeyRef.current = key;
    if (!isSearching) {
      performSearch(key);
    }
  }, [key]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.searchWrapper}>
        <button type="button" className={styles.searchBtn}>
          <FcSearch />
        </button>
        <div className={styles.formGroup} onClick={handleSearchBarClick}>
          <input 
          type="text"
          className={styles.formControl}
          placeholder="Search recipes..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onBlur={handleInputBlur}
          />
          {key && ( // Show the clear button only if there is text in the input
            <button type="button" className={styles.clearBtn} onClick={handleClearInput}>
              &times; {/* X character */}
            </button>
          )}
        </div>
        {/* Display search results if available */}
        {searchResult && searchResult.length > 0 && (
          <div className={styles.searchResult} ref={searchResultRef}>
            {searchResult.map((recipe) => (
              <button className={styles.searchItem} key={recipe._id} onClick={(e) => { e.preventDefault(); handleRecipeClick(recipe); }}>
                <h3 className={styles.searchItemText}>
                  {recipe}
                </h3>
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar;