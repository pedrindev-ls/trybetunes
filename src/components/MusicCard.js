import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Input from './Input';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      // favorite: false,
      musicChecked: [],
    };
  }

  componentDidMount() {
    this.takingStorage();
  }

  savingMusics = (mark, music) => {
    this.setState({ loading: true }, async () => {
      if (mark) {
        await addSong(music);
        this.setState({ loading: false });
      } else if (!mark) {
        await removeSong(music);
        this.setState({ loading: false });
      }
    });
  }

  takingStorage = async () => {
    const favMusic = await getFavoriteSongs();
    this.setState({ musicChecked: favMusic });
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
              <Input
                music={ music }
                savingMusics={ this.savingMusics }
              />
            </div>))}
        </div>
      );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.array,
}.isRequired;

export default MusicCard;
