import React, { useContext } from 'react';

import { Header } from './components/header';
import { MessageList } from './components/messages';
import { Message } from './components/messages';
import { EmailContext } from './context/EmailContext';

import './App.scss';

const App = () => {
  const { currentEmail } = useContext(EmailContext);
  
  return (
    <div className="App">
      <main>
        <Header />
        {currentEmail ? <Message /> : <MessageList />}
      </main>
    </div>
  );
}

export default App;
