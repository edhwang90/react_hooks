import React, { useContext } from 'react';

import { Header } from './components/header';
import { MessageList } from './components/messages';
import { Message } from './components/messages';
import { EmailContext } from './context/EmailContext';

import styled from 'styled-components';

const Content = styled.section`
  background-color: ${ props => props.theme.bg };
`;

const App = () => {
  const { currentEmail } = useContext(EmailContext);

  return (
    <main>
      <Header />
      <Content>
        {currentEmail ? <Message /> : <MessageList />}
      </Content>
    </main>
  );
}

export default App;
