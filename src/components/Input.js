import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    this.favoriting();
  }

  favoriting = () => {
    const { favs, music } = this.props;
    favs.forEach((element) => {
      if (element.trackId === music.trackId) {
        console.log('Entrou');
        this.setState({ favorite: true });
      }
    });
  };

  onInputChange = ({ target }) => {
    const { savingMusics, music } = this.props;
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => savingMusics(checked, music));
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
