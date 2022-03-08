import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      button: true,
      loading: false,
      albunsFound: [],
      artistFound: false,
      artistFoundName: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validateButton);
  }

  confirmedSearch = async () => {
    const { search } = this.state;
    const searched = search;
    this.setState({
      loading: true,
      search: '',
      artistFoundName: searched,
    });
    const albuns = await searchAlbumsAPI(searched);
    this.setState({
      loading: false,
      albunsFound: albuns,
      artistFound: true,
    });
    console.log(albuns);
  }

  validateButton = () => {
    const { search } = this.state;
    if (search.length >= 2) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  render() {
    const {
      button, search, loading, albunsFound, artistFound, artistFoundName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <p>Carregando...</p>
          : (
            <section>
              <form>
                <label htmlFor="search">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={ search }
                    data-testid="search-artist-input"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ button }
                  onClick={ this.confirmedSearch }
                >
                  Procurar

                </button>
              </form>
            </section>)}
        <hr />
        <div>
          {albunsFound.length > 0 && artistFound
            ? (
              <p>
                Resultado de álbuns de:
                {' '}
                {artistFoundName}
              </p>)
            : ''}
          {albunsFound.length === 0 && artistFound
            ? <p>Nenhum álbum foi encontrado</p>
            : albunsFound.map((album) => (
              <Link
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <div key={ album.collectionId }>
                  <img
                    src={ album.artworkUrl100 }
                    alt={ `Capa do Album ${album.collectionName}` }
                  />
                  <p>{ album.collectionName }</p>
                  <p>{ album.artistName }</p>
                </div>
              </Link>))}
        </div>
      </div>
    );
  }
}

export default Search;
