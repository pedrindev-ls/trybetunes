import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Input extends Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };
  }

  async componentDidMount() {
    const favs = await getFavoriteSongs();
    console.log(favs);
    const { music } = this.props;
    favs.forEach((element) => {
      if (+element.trackId === music.trackId) {
        this.setState({ favorite: true });
      }
    });
  }

  onInputChange = ({ target }) => {
    const { savingMusics } = this.props;
    const { name, checked, value } = target;
    this.setState({ [name]: checked }, () => savingMusics(checked, value));
  }

  render() {
    const { favorite } = this.state;
    const { music } = this.props;
    return (
      <label htmlFor="favorite">
        <input
          type="checkbox"
          id="favorite"
          name="favorite"
          data-testid={ `checkbox-music-${music.trackId}` }
          value={ music.trackId }
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
