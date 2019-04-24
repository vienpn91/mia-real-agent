import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResponseBox extends Component {
  state = {
    miaResponse: '',
  }

  handleInput = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  render() {
    const { miaResponse } = this.state;

    return (
      <TrainMiaResponseInput
        placeholder="Mia response"
        value={miaResponse}
        onChange={this.handleInput('miaResponse')}
      />
    );
  }
}

ResponseBox.propTypes = {

};

export default ResponseBox;
