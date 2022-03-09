import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     loading: false,
  //   };
  // }

  savingMusics = ({ target }) => {
    // this.setState({ loading: true });
    const { value, checked } = target;
    if (checked) {
      addSong({ trackId: value });
    } else if (!checked) {
      removeSong({ trackId: value });
    }
  }

  render() {
    const { musics } = this.props;
    // const { loading } = this.state;
    return (
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
                data-testid={ `checkbox-music-${music.trackId}` }
                value={ music.trackId }
                onClick={ this.savingMusics }
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
