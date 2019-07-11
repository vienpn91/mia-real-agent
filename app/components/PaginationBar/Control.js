import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconControlStyled, TextControlStyled } from './PaginationBar.styled';

class Control extends PureComponent {
  onClick = (e) => {
    e.preventDefault();
    const { controlKey } = this.props;
    const { handleControlSelect } = this.props;
    handleControlSelect(controlKey);
  };

  renderIconControl = () => {
    const { controlKey } = this.props;
    let className = '';
    switch (controlKey) {
      case 'prev':
        className = 'mia-chevron-left';
        break;
      case 'next':
        className = 'mia-chevron-right';
        break;
      default:
        break;
    }
    return (
      <IconControlStyled
        onClick={this.onClick}
        className={className}
        aria-hidden="true"
      />
    );
  };

  renderTextControl = () => {
    const { controlKey } = this.props;
    return (
      <TextControlStyled onClick={this.onClick}>{controlKey}</TextControlStyled>
    );
  };

  render() {
    const { type } = this.props;
    if (type === 'icon') {
      return this.renderIconControl();
    }
    return this.renderTextControl();
  }
}

Control.propTypes = {
  controlKey: PropTypes.string.isRequired,
  handleControlSelect: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Control;
