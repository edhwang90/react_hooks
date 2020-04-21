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
    background-color: ${ props => props.theme.bg };
  }

  button {
    border: none;
    background-color: ${ props => props.theme.primary };
    color: ${ props => props.theme.primaryfc};
    width: 100%;
    margin-top: 50px;
  }

  .error {
    color: ${ props => props.theme.error };
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
            className="action-p"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        <label>Password</label>
        <input
            className="action-p"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {error && <div className="error">{error.message}</div>}
        <button className="action-p" type="submit" disabled={loading}>
          Sign In
        </button>
      </form>
    </Content>
  );
}