
import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onSearchResults }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Handle checkbox changes
  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };


  const handleDisplayClick = () => {
    onSearchResults(selectedIngredients); 
  };

  return (
    <span className={styles.filterBar}>
      <h3>Filter by Ingredients</h3>
      <label>
        <input
          type="checkbox"
          value="Eggs"
          onChange={() => handleCheckboxChange('Eggs')}
        />
        Eggs
      </label>
      <label>
        <input
          type="checkbox"
          value="Flour"
          onChange={() => handleCheckboxChange('Flour')}
        />
        Flour
      </label>
      <label>
        <input
          type="checkbox"
          value="Chocolate"
          onChange={() => handleCheckboxChange('Chocolate')}
        />
        Chocolate
      </label>
      <button onClick={handleDisplayClick}>Display</button>
    </span>
  );
};

export default FilterBar;




// import React, { useState } from 'react';
// import styles from './FilterBar.module.css';
// const FilterBar = ({ onSearchResults }) => {
//   const [selectedIngredients, setSelectedIngredients] = useState([]);

//   // Handle checkbox changes
//   const handleCheckboxChange = (ingredient) => {
//     setSelectedIngredients((prevSelected) => {
//       if (prevSelected.includes(ingredient)) {
//         return prevSelected.filter((item) => item !== ingredient);
//       } else {
//         return [...prevSelected, ingredient];
//       }
//     });
//   };


//   const handleDisplayClick = () => {
//     onSearchResults(selectedIngredients); 
//   };

//   return (
//     <span className={styles.filterBar}>
//       <h3>Filter by Ingredients</h3>
//       <label>
//         <input
//           type="checkbox"
//           value="Eggs"
//           onChange={() => handleCheckboxChange('Eggs')}
//         />
//         Eggs
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Flour"
//           onChange={() => handleCheckboxChange('Flour')}
//         />
//         Flour
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Chocolate"
//           onChange={() => handleCheckboxChange('Chocolate')}
//         />
//         Chocolate
//       </label>
//       <button onClick={handleDisplayClick}>Display</button>
//     </span>
//   );
// };

// export default FilterBar;
// const FilterBar = ({ onSearchResults }) => {
//   const [selectedIngredients, setSelectedIngredients] = useState([]);

//   // Handle checkbox changes
//   const handleCheckboxChange = (ingredient) => {
//     setSelectedIngredients((prevSelected) => {
//       if (prevSelected.includes(ingredient)) {
//         return prevSelected.filter((item) => item !== ingredient);
//       } else {
//         return [...prevSelected, ingredient];
//       }
//     });
//   };


//   const handleDisplayClick = () => {
//     onSearchResults(selectedIngredients); 
//   };

//   return (
//     <span className={styles.filterBar}>
//       <h3>Filter by Ingredients</h3>
//       <label>
//         <input
//           type="checkbox"
//           value="Eggs"
//           onChange={() => handleCheckboxChange('Eggs')}
//         />
//         Eggs
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Flour"
//           onChange={() => handleCheckboxChange('Flour')}
//         />
//         Flour
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Chocolate"
//           onChange={() => handleCheckboxChange('Chocolate')}
//         />
//         Chocolate
//       </label>
//       <button onClick={handleDisplayClick}>Display</button>
//     </span>
//   );
// };

// export default FilterBar;

// const FilterBar = ({ onSearchResults }) => {
//   const [selectedIngredients, setSelectedIngredients] = useState([]);

//   // Handle checkbox changes
//   const handleCheckboxChange = (ingredient) => {
//     setSelectedIngredients((prevSelected) => {
//       if (prevSelected.includes(ingredient)) {
//         return prevSelected.filter((item) => item !== ingredient);
//       } else {
//         return [...prevSelected, ingredient];
//       }
//     });
//   };


//   const handleDisplayClick = () => {
//     onSearchResults(selectedIngredients); 
//   };

//   return (
//     <span className={styles.filterBar}>
//       <h3>Filter by Ingredients</h3>
//       <label>
//         <input
//           type="checkbox"
//           value="Eggs"
//           onChange={() => handleCheckboxChange('Eggs')}
//         />
//         Eggs
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Flour"
//           onChange={() => handleCheckboxChange('Flour')}
//         />
//         Flour
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Chocolate"
//           onChange={() => handleCheckboxChange('Chocolate')}
//         />
//         Chocolate
//       </label>
//       <button onClick={handleDisplayClick}>Display</button>
//     </span>
//   );
// };

// export default FilterBar;


// import React, { useState } from 'react';
// import styles from './FilterBar.module.css';



// const FilterBar = () => {
//   return (
//     <span className={styles.filterBar}>
//       <h3>Filter by Ingredients</h3>
//       <label>
//         <input
//           type="checkbox"
//           value="Eggs"
//           onChange={() => handleCheckboxChange('Eggs')}
//         />
//         Eggs
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Flour"
//           onChange={() => handleCheckboxChange('Flour')}
//         />
//         Flour
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           value="Chocolate"
//           onChange={() => handleCheckboxChange('Chocolate')}
//         />
//         Chocolate
//       </label>
//       <button onClick={handleDisplayClick}>Display</button>
//     </span>
//   );
// };

// export default FilterBar;

// // import React, { useState } from 'react';
// // import styles from './FilterBar.module.css';

// // const FilterBar = ({ onSearchResults }) => {
// //   const [selectedIngredients, setSelectedIngredients] = useState([]);

// //   // Handle checkbox changes
// //   const handleCheckboxChange = (ingredient) => {
// //     setSelectedIngredients((prevSelected) => {
// //       if (prevSelected.includes(ingredient)) {
// //         return prevSelected.filter((item) => item !== ingredient);
// //       } else {
// //         return [...prevSelected, ingredient];
// //       }
// //     });
// //   };

// //   // Handle "Display" button click
// //   const handleDisplayClick = () => {
// //     onSearchResults(selectedIngredients); // Send selected ingredients to parent (App.js)
// //   };

// //   return (
// //     <span className={styles.filterBar}>
// //       <h3>Filter by Ingredients</h3>
// //       <label>
// //         <input
// //           type="checkbox"
// //           value="Eggs"
// //           onChange={() => handleCheckboxChange('Eggs')}
// //         />
// //         Eggs
// //       </label>
// //       <label>
// //         <input
// //           type="checkbox"
// //           value="Flour"
// //           onChange={() => handleCheckboxChange('Flour')}
// //         />
// //         Flour
// //       </label>
// //       <label>
// //         <input
// //           type="checkbox"
// //           value="Chocolate"
// //           onChange={() => handleCheckboxChange('Chocolate')}
// //         />
// //         Chocolate
// //       </label>
// //       <button onClick={handleDisplayClick}>Display</button>
// //     </span>
// //   );
// // };

// // export default FilterBar;

// // import React, { useState } from 'react';
// // import styles from './FilterBar.module.css';

// // const FilterBar = ({ onSearchResults }) => {
// //   const [selectedIngredients, setSelectedIngredients] = useState([]);

// //   // Handle checkbox changes
// //   const handleCheckboxChange = (ingredient) => {
// //     setSelectedIngredients((prevSelected) => {
// //       if (prevSelected.includes(ingredient)) {
// //         return prevSelected.filter((item) => item !== ingredient);
// //       } else {
// //         return [...prevSelected, ingredient];
// //       }
// //     });
// //   };

// //   // Handle "Display" button click
// //   const handleDisplayClick = () => {
// //     onSearchResults(selectedIngredients); // Send selected ingredients to parent (App.js)
// //   };

// //   return (
// //     <span className={styles.filterBar}>
// //       <h3>Filter by Ingredients</h3>
// //       <label>
// //         <input
// //           type="checkbox"
// //           value="Eggs"
// //           onChange={() => handleCheckboxChange('Eggs')}
// //         />
// //         Eggs
// //       </label>
// //       <label>
// //         <input
// //           type="checkbox"
// //           value="Flour"
// //           onChange={() => handleCheckboxChange('Flour')}
// //         />
// //         Flour
// //       </label>
// //       <label>
// //         <input
// //           type="checkbox"
// //           value="Chocolate"
// //           onChange={() => handleCheckboxChange('Chocolate')}
// //         />
// //         Chocolate
// //       </label>
// //       <button onClick={handleDisplayClick}>Display</button>
// //     </span>
// //   );
// // };

// // export default FilterBar;



// // import React, { useState } from 'react';
// // import styles from './FilterBar.module.css';

// // const FilterBar = ({ onSearchResults }) => {
// //   const [selectedIngredients, setSelectedIngredients] = useState({
// //     eggs: false,
// //     flour: false,
// //     chocolate: false,
// //   });

// //   const handleCheckboxChange = (e) => {
// //     const { name, checked } = e.target;
// //     setSelectedIngredients((prevState) => ({
// //       ...prevState,
// //       [name]: checked,
// //     }));
// //   };

// //   const handleSearch = () => {
// //     const selected = Object.keys(selectedIngredients).filter(
// //       (ingredient) => selectedIngredients[ingredient]
// //     );
// //     onSearchResults(selected); // Simulate passing selected ingredients back to parent
// //   };

// //   return (
// //     <div className={styles.filterBar}>
// //       <h3>Filter by Ingredients</h3>
// //       <label>
// //         <input
// //           type="checkbox"
// //           name="eggs"
// //           checked={selectedIngredients.eggs}
// //           onChange={handleCheckboxChange}
// //         />
// //         Eggs
// //       </label>
// //       <br />
// //       <label>
// //         <input
// //           type="checkbox"
// //           name="flour"
// //           checked={selectedIngredients.flour}
// //           onChange={handleCheckboxChange}
// //         />
// //         Flour
// //       </label>
// //       <br />
// //       <label>
// //         <input
// //           type="checkbox"
// //           name="chocolate"
// //           checked={selectedIngredients.chocolate}
// //           onChange={handleCheckboxChange}
// //         />
// //         Chocolate
// //       </label>
// //       <br />
// //       <button onClick={handleSearch}>Display</button>
// //     </div>
// //   );
// // };

// // export default FilterBar;

// // import React, { useState } from 'react';
// // import axios from 'axios'; 
// // import styles from './FilterBar.module.css';

// // const FilterBar = ({ onSearchResults, currentCategory }) => {
// //   const [selectedIngredients, setSelectedIngredients] = useState({
// //     Eggs: false,
// //     Flour: false,
// //     Chocolate: false,
// //   });

// //   // Handle checkbox change
// //   const handleCheckboxChange = (ingredient) => {
// //     setSelectedIngredients((prev) => ({
// //       ...prev,
// //       [ingredient]: !prev[ingredient],
// //     }));
// //   };

// //   // Handle "Display" button click
// //   const handleSearchClick = async () => {
// //     // Filter the selected ingredients
// //     const selected = Object.keys(selectedIngredients).filter(
// //       (key) => selectedIngredients[key]
// //     );

// //     try {
// //       // Build the query string with ingredients and category
// //       const query = selected.length > 0 ? `ingredients=${selected.join(',')}&category=${currentCategory}` : `category=${currentCategory}`;

// //       // Send GET request
// //       const response = await axios.get(`/api/recipes?${query}`);
// //       onSearchResults(response.data.recipes);
// //     } catch (error) {
// //       console.error('Error fetching recipes:', error);
// //     }
// //   };

// //   return (
// //     <div className={styles.filterBar}>
// //       <h3>Filter by Ingredients:</h3>
// //       <label>
// //         <input
// //           type="checkbox"
// //           checked={selectedIngredients.Eggs}
// //           onChange={() => handleCheckboxChange('Eggs')}
// //         />
// //         Eggs
// //       </label>
// //       <br />
// //       <label>
// //         <input
// //           type="checkbox"
// //           checked={selectedIngredients.Flour}
// //           onChange={() => handleCheckboxChange('Flour')}
// //         />
// //         Flour
// //       </label>
// //       <br />
// //       <label>
// //         <input
// //           type="checkbox"
// //           checked={selectedIngredients.Chocolate}
// //           onChange={() => handleCheckboxChange('Chocolate')}
// //         />
// //         Chocolate
// //       </label>
// //       <br />
// //       <button onClick={handleSearchClick}>Display</button>
// //     </div>
// //   );
// // };

// // export default FilterBar;


// // import React from 'react';
// // import styles from './FilterBar.module.css';




// // const FilterBar = () => {
// //     return (
// //         <span className={styles.filterBar}>
// //         </span>
// //     )
// // };

// // export default FilterBar;
