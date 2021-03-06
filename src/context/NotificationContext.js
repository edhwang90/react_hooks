import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.ul`
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 2;

  li {
    background-color: ${ props => props.theme.bg };
  }

  button {
    border: none;
    margin-left: 20px;
    background-color: ${ props => props.theme.error };
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;

const NotificationContext = React.createContext();

const NotificationProvider = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const cleanup = () => {
      var now = new Date().getTime();
  
      setMessages(
        messages.filter(m => now - m.addedAt < 3000)
      );
    };

    let timer = setInterval(cleanup, 1000);

    return () => clearInterval(timer);
  }, [messages]);

  const addMessage = text => {
    setMessages([
      ...messages,
      {
        id: Math.random(),
        text,
        addedAt: new Date().getTime()
      }
    ]);
  };

  const removeMessage = message => {
    setMessages(
      messages.filter(m => m.id !== message.id)
    );
  };

  const initialConfig = {
    messages,
    notify: addMessage
  }

  return (
    <NotificationContext.Provider value={initialConfig}>
      <Wrapper>
        {messages.map((message, key) => (
          <Notification
            key={key}
            message={message}
            onClose={() => removeMessage(message)}
          />
        ))}
      </Wrapper>
      {props.children}
    </NotificationContext.Provider>
  );
}



const Notification = ({ message, onClose }) => (
  <li className="content content-mt">
    {message.text}
    <button onClick={onClose}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </li>
);

const withNotifier = (ComponentToWrap) => props => {
  const { notify } = useContext(NotificationContext);
  return (
    <ComponentToWrap {...props} notify={notify} />
  )
}

export {
  NotificationProvider,
  NotificationContext,
  withNotifier
};