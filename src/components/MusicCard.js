import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Input from './Input';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      // favorite: false,
      musicChecked: [],
    };
  }

  async componentDidMount() {
    await this.takingStorage();
    this.setState({ loading: false });
  }

  savingMusics = (mark, music) => {
    this.setState({ loading: true }, async () => {
      if (mark) {
        await addSong(music);
      } else if (!mark) {
        await removeSong(music);
      }
      await this.takingStorage();
      this.setState({ loading: false });
    });
  }

  takingStorage = async () => {
    const favMusic = await getFavoriteSongs();
    this.setState({ musicChecked: favMusic });
  }

  render() {
    const { musics } = this.props;
    const { loading, musicChecked } = this.state;
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
                favs={ musicChecked }
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
