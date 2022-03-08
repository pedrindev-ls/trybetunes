import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumView: {},
      completeAlbum: [],
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const fullAlbum = await getMusics(id);
    this.setState({
      albumView: fullAlbum[0],
    });
    this.arrayToTracks(fullAlbum);
  }

  arrayToTracks = (array) => {
    const musics = array.filter((obj) => obj.kind === 'song');
    this.setState({ completeAlbum: musics });
    console.log(musics);
  }

  render() {
    const { albumView, completeAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <hr />
        <section>
          <h3 data-testid="artist-name">{ albumView.artistName }</h3>
          <p data-testid="album-name">{ albumView.collectionName }</p>
          <MusicCard musics={ completeAlbum } />
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
