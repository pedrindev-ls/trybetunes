import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    getUser().then((newUser) => this.setState({ user: newUser }));
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {!user.name ? 'Carregando...' : <p data-testid="header-user-name">{user.name}</p>}
      </header>
    );
  }
}

export default Header;
