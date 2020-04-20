import React, { useContext, useState, useEffect } from 'react';

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
      <div className="notification-wrapper">
        <ul>
          {messages.map((message, key) => (
            <Notification
              key={key}
              message={message}
              onClose={() => removeMessage(message)}
            />
          ))}
        </ul>
        {props.children}
      </div>
    </NotificationContext.Provider>
  );
}

const Notification = ({ message, onClose }) => (
  <li>
    {message.text}
    <button className="close" onClick={onClose}>
      &times;
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