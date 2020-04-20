import React, { useContext} from 'react';
import { login } from '../../FakeAPI';
import { UserContext } from '../../context/UserContext';

export class Login extends React.Component {
  static contextType = UserContext;
  state = {
    error: null,
    loading: false,
    username: '',
    password: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e, onLogin) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    login(this.state.username, this.state.password)
      .then(user => {
        this.setState({ loading: false });
        onLogin(user);
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { username, password, error, loading } = this.state;
    const { onLogin } = this.context;
    
    return (
      <div className="LoginPage">
        <form onSubmit={e => this.handleSubmit(e, onLogin)}>
          <label>
            Username
            <input
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </label>
          {error && <div className="error">{error.message}</div>}
          <button type="submit" disabled={loading}>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}