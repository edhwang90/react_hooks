import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import { Login } from './components/login';
import { UserContext } from './context/UserContext';
import { UserProvider } from './context/UserContext';
import { EmailProvider } from './context/EmailContext';
import { NotificationProvider } from './context/NotificationContext';

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
    <NotificationProvider>
      <UserProvider>
        <EmailProvider>
          <Root />
        </EmailProvider>
      </UserProvider>
     </NotificationProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
