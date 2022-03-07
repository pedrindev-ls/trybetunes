import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      button: true,
      user: {
        name: '',
      },
      loading: false,
      userDone: false,
    };
  }

  // componentWillUnmount() {

  // }
  // goToSearch = () => {
  //   const { userDone } = this.state;
  //   return userDone ? <Redirect to="/search" /> : '';
  // }

  handleClick = async () => {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ userDone: true });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const valueToValidate = 3;
    this.setState({
      user: {
        [name]: value,
      },
    });
    if (value.length >= valueToValidate) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  render() {
    const { button, loading, userDone } = this.state;
    return loading
      ? (
        <div>
          <p>Carregando...</p>
          {userDone ? <Redirect to="/search" /> : ''}
        </div>
      )
      : (
        <div data-testid="page-login">
          <form>
            <label htmlFor="name-input">
              <input
                type="text"
                placeholder="Nome"
                name="name"
                id="name-input"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              onClick={ this.handleClick }
              type="button"
              data-testid="login-submit-button"
              disabled={ button }
            >
              Entrar
            </button>
          </form>
        </div>
      );
  }
}

export default Login;
