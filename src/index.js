import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import { Login } from './components/login';
import { UserContext } from './context/UserContext';
import { UserProvider } from './context/UserContext';
import { EmailProvider } from './context/EmailContext';
import { NotificationProvider } from './context/NotificationContext';

import { ThemeProvider } from 'styled-components';
import './index.scss';

const theme = {
  primary: '#007bff',
  primaryfc: '#ffffff',
  bg: '#f7f7f7',
  error: '#c82333'
}

const Root = () => {
 const { user } = useContext(UserContext);

  return (
    <React.Fragment>
      { 
        user 
        ? (<App />) 
        : (<Login />)
      }
    </React.Fragment>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <UserProvider>
          <EmailProvider>
            <Root />
          </EmailProvider>
        </UserProvider>
      </NotificationProvider> 
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
