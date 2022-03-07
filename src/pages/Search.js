import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      button: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ artist: value }, this.validateButton);
  }

  validateButton = () => {
    const { artist } = this.state;
    if (artist.length >= 2) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  render() {
    const { button } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <form>
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ button }
            >
              Procurar

            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Search;
