import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
    };
  }

  favoriting = async () => {
    const favs = await getFavoriteSongs();
    const { music } = this.props;
    favs.forEach((element) => {
      if (element.trackId === music.trackId) {
        this.setState({ favorite: true });
      }
    });
  };

  // async componentDidMount() {
  //   const favs = await getFavoriteSongs();
  //   const { music } = this.props;
  //   favs.forEach((element) => {
  //     if (element.trackId === music.trackId) {
  //       this.setState({ favorite: true });
  //     }
  //   });
  // }

  onInputChange = ({ target }) => {
    const { savingMusics, music } = this.props;
    const { name, checked } = target;
    this.setState({ [name]: checked });
    savingMusics(checked, music);
  }

  render() {
    const { favorite } = this.state;
    const { music } = this.props;
    this.favoriting();
    return (
      <label htmlFor="favorite">
        <input
          type="checkbox"
          id="favorite"
          name="favorite"
          data-testid={ `checkbox-music-${music.trackId}` }
          onChange={ this.onInputChange }
          checked={ favorite }
        />
      </label>
    );
  }
}

Input.propTypes = {
  music: PropTypes.obj,
}.isRequired;

export default Input;
