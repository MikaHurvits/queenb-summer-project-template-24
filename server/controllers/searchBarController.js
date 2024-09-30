const Recipe = require('../models/RecipeModel');

//idea save the last key search and the items in the search result
//if the new key search is contain in the last search result, so search from the last search result
//if not, do the search from the database
const searchCache = new Map();
const CACHE_EXPIRATION = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_RESULTS = 1000;

//Search recipes from recipes model
async function searchRecipesFromModel(key) {
    // This regex will match the key anywhere in the title
    // The $options: 'i' flag makes the search case-insensitive
    const recipes = await Recipe.find({
        title: { $regex: key, $options: 'i' }
    });

    console.log(`Searched database. Found ${recipes.length} matching recipes`);

    return recipes;
}
// Sort the recipes: prefix matches first, then contains matches
const sortRecipes = (recipes, key) => {
    return recipes.sort((a, b) => {
        const aStartsWith = a.title.toLowerCase().startsWith(key.toLowerCase());
        const bStartsWith = b.title.toLowerCase().startsWith(key.toLowerCase());
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
    });
}

const searchRecipes = async (req, res) => {
    const { key } = req.query;
    let recipes;
    
    try {
        if (req.user) {
            // Using cache
            const cacheId = req.user.id; // Use user ID if logged in, otherwise use session ID or generate a guest ID
            
            console.log(`User ${cacheId} searching for: "${key}"`);

            const userCache = searchCache.get(cacheId) || { lastKey: '', lastResults: [] };
            
            if (userCache.lastKey !== '' && key.toLowerCase().startsWith(userCache.lastKey.toLowerCase())) {
                // If the new key starts with the previous key, filter from previous results
                recipes = userCache.lastResults.filter(recipe => 
                    recipe.title.toLowerCase().includes(key.toLowerCase())
                );
                console.log(`Filtered from previous results. Found ${recipes.length} matching recipes`);
            } else {
                // If the new key doesn't start with the previous key, search from RecipeModel
                recipes = await searchRecipesFromModel(key);
            }

            recipes = sortRecipes(recipes, key);
            
            // Update the cache with the new search results
            searchCache.set(cacheId, {
                lastKey: key,
                lastResults: recipes.slice(0, MAX_CACHE_RESULTS),
                timestamp: Date.now()
            });
            
            res.json(recipes);
            
        } else {
            // Don't using cache
            recipes = await searchRecipesFromModel(key);
            recipes = sortRecipes(recipes, key);

            res.json(recipes);
        }
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching recipes', error: error.message });
    }
}
// Clear the cache when the user logout
const clearUserCache = (userId) => {
    if (searchCache.has(userId)) {
        searchCache.delete(userId);
        console.log(`Cache cleared for user ${userId} on logout`);
    }
};

// Periodically clear expired cache entries
// The "id" here is the same cacheId used to store the cache entry. It represents either:
// 1. The user ID for logged-in users
// 2. The session ID for guests with an active session
// 3. A generated guest ID for guests without a session
setInterval(() => {
    const now = Date.now();
    for (const [id, cache] of searchCache.entries()) {
        if (now - cache.timestamp > CACHE_EXPIRATION) {
            searchCache.delete(id);
            console.log(`Cache cleared for ID ${id}`);
        }
    }
}, CACHE_EXPIRATION);

module.exports = {
    searchRecipes,
    clearUserCache
}

//Code to insert in the logout function for clear the cache of the user
// const { clearUserCache } = require('./searchBarController');

// // In your logout function
// const handleLogout = (req, res) => {
//     const userId = req.user.id;
//     // ... your existing logout logic ...
//     clearUserCache(userId);
//     // ... complete the logout process ...
// };
