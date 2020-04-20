import React, { useState } from 'react';
import { FAKE_USER } from '../FakeAPI';

const UserContext = React.createContext();

const UserProvider = (props) => {

  const [user, setUser] = useState(FAKE_USER);

  const handleLogin = user => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const initialConfig = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return (
    <UserContext.Provider value={initialConfig}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };