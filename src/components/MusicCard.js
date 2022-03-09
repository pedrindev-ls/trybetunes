import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      musicChecked: [],
    };
  }

  savingMusics = async ({ target }) => {
    this.setState({ loading: true });
    const { value, checked } = target;
    if (checked) {
      await addSong({ trackId: value });
      this.setState({ loading: false });
    } else if (!checked) {
      await removeSong({ trackId: value });
      this.setState({ loading: false });
    }
    this.checking(value);
  }

  takingStorage = async () => {
    const favMusic = await getFavoriteSongs();
    this.setState({ musicChecked: favMusic });
  }

  checking = async (music) => {
    await this.takingStorage();
    const { musicChecked } = this.state;
    musicChecked.forEach((element) => element.trackId === music);
  }

  render() {
    const { musics } = this.props;
    const { loading } = this.state;
    return loading ? <p>Carregando...</p>
      : (
        <div>
          {musics.map((music) => (
            <div key={ music.trackId }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                <input
                  type="checkbox"
                  id="favorite"
                  name="favorite"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  value={ music.trackId }
                  onChange={ this.savingMusics }
                  // checked={ this.checking(music.trackId) }
                />
              </label>
            </div>))}
        </div>
      );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.array,
}.isRequired;

export default MusicCard;
