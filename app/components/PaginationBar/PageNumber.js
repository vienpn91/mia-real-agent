import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PaginationPageNumberStyled } from './PaginationBar.styled';

class PageNumber extends PureComponent {
  onClick = (e) => {
    e.preventDefault();
    const { pageIndex } = this.props;
    const { handlePageNumberSelect } = this.props;
    handlePageNumberSelect(pageIndex);
  };

  render() {
    const { pageIndex, selected } = this.props;
    return (
      <PaginationPageNumberStyled selected={selected} onClick={this.onClick}>
        {pageIndex}
      </PaginationPageNumberStyled>
    );
  }
}

PageNumber.propTypes = {
  handlePageNumberSelect: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default PageNumber;
