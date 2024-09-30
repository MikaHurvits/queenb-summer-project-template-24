import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import styles from './auth-form.module.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await signup(firstName, lastName, username, email, password);

    if (user) {
      navigate('/'); // Redirect to home page after successful signup
    }
  };

  return (
    <div className="auth-container">
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          autoComplete="username"
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          autoComplete="new-password"
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
