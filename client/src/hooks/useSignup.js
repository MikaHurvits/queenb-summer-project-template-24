import { useState } from 'react';
import { useAuthContext } from './useAuthContext';


export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Function to validate password strength and return detailed error messages
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character (e.g., !@#$%^&*).');
    }
    return errors.length > 0 ? errors.join(' ') : null;
  };

  const signup = async (firstName, lastName, username, email, password) => {
    setIsLoading(true);
    setError(null);

    // Validate the password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setIsLoading(false);
      setError(passwordError);
      return null;
    }

    // Send the signup request to the API
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });

    const json = await response.json();

    // Handle errors from server response
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
