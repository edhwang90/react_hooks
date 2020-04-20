import React, { useContext } from 'react';

const NotificationContext = React.createContext();

class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      notify: this.addMessage
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.cleanup, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  addMessage = text => {
    this.setState(state => ({
      messages: [
        ...state.messages,
        {
          id: Math.random(),
          text,
          addedAt: new Date().getTime()
        }
      ]
    }));
  };

  cleanup = () => {
    let now = new Date().getTime();
    this.setState(state => ({
      messages: state.messages.filter(
        m => now - m.addedAt < 3000
      )
    }));
  };

  removeMessage = message => {
    this.setState(state => ({
      messages: state.messages.filter(
        m => m.id !== message.id
      )
    }));
  };

  render() {
    return (
      <NotificationContext.Provider value={this.state}>
        <div className="notification-wrapper">
          <ul>
            {this.state.messages.map(message => (
              <Notification
                key={message.id}
                message={message}
                onClose={() => this.removeMessage(message)}
              />
            ))}
          </ul>
          {this.props.children}
        </div>
      </NotificationContext.Provider>
    );
  }
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