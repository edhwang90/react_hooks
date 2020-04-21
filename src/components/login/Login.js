import React, { useContext, useState } from 'react';
import { login } from '../../FakeAPI';
import { UserContext } from '../../context/UserContext';

import styled from 'styled-components';

const Content = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  label, input, button {
    display: block;
    padding: 10px 15px;
    font-size: 1.5em;
  }

  label {
    padding: 0;
    margin-bottom: 10px;

    &:last-of-type {
      margin-top: 50px;
    }
  }

  input {
    border: none;
    background-color: #f7f7f7;
  }

  button {
    border: none;
    background-color: #007bff;
    color: #fff;
    width: 100%;
    margin-top: 50px;
  }

  .error {
    color: red;
    margin-top: 10px;
  }
`;
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
    <Content>
      <form onSubmit={e => handleSubmit(e, onLogin)}>
        <label>Username</label>
        <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        <label>Password</label>
        <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {error && <div className="error">{error.message}</div>}
        <button type="submit" disabled={loading}>
          Sign In
        </button>
      </form>
    </Content>
  );
}