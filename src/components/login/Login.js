import React, { useContext, useState } from 'react';
import { login } from '../../FakeAPI';
import { UserContext } from '../../context/UserContext';

export const Login = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e, onLogin) => {
    e.preventDefault();

    setLoading(true);
    
    login(username, password)
      .then(user => {
        setLoading(false);
        onLogin(user);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  };

  const { onLogin } = useContext(UserContext);

  return (
    <div className="LoginPage">
      <form onSubmit={e => handleSubmit(e, onLogin)}>
        <label>
          Username
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <div className="error">{error.message}</div>}
        <button type="submit" disabled={loading}>
          Sign In
        </button>
      </form>
    </div>
  );
}