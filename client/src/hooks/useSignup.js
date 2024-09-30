import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, username, email, password) => {
    setIsLoading(true);
    setError(null);

    // Send the signup request to the API
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });

    const json = await response.json();

    // Handle errors
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return null;  // Return null in case of error
    }

    // If signup is successful
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // Set loading to false
      setIsLoading(false);

      // Return the user data (json)
      return json;  // Make sure to return user data after successful signup
    }
  };

  return { signup, isLoading, error };
};
