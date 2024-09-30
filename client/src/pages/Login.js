import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './auth-form.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate(); // Create navigate instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password);

    if (user) {
      navigate('/'); // Redirect to home page after successful login
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email address:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} 
        autoComplete="username" value={email} required />

        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
        value={password} required />

        <button disabled={isLoading}>Log in</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
