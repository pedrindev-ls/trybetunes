import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">
          <button type="button">
            Pesquisar
          </button>
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          <button type="button">Favoritos</button>
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          <button type="button">Perfil</button>
        </Link>
        {!user.name ? 'Carregando...' : <p data-testid="header-user-name">{user.name}</p>}
      </header>
    );
  }
}

export default Header;
