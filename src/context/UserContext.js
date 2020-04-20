import React from 'react';
import { FAKE_USER } from '../FakeAPI';

let UserContext;
const { Provider } = UserContext = React.createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: FAKE_USER,
      onLogin: this.handleLogin,
      onLogout: this.handleLogout
    };
  }

  handleLogin = user => {
    this.setState({ user: user });
  };

  handleLogout = () => {
    this.setState({ user: null });
  };

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

export { UserProvider, UserContext };