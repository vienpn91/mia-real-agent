import React from 'react';
import PropTypes from 'prop-types';
import _range from 'lodash/range';
import {
  PaginationBarStyled,
  PaginationWrapperStyled,
  PaginationContentWrapperStyled,
  DotsStyled,
} from './PaginationBar.styled';
import Control from './Control';
import PageNumber from './PageNumber';

class PaginationBar extends React.PureComponent {
  selectPageItem = (key) => {
    const {
      changePage, selectedPage, totalPage, sizePerPage,
    } = this.props;
    if (!changePage) {
      return;
    }
    let nextPage = key;
    switch (key) {
      case 'prev':
        nextPage = Math.max(selectedPage - 1, 1);
        break;
      case 'next':
        nextPage = Math.min(selectedPage + 1, totalPage);
        break;
      case 'first':
        nextPage = 1;
        break;
      case 'last':
        nextPage = totalPage;
        break;
      default:
        break;
    }
    if (nextPage !== selectedPage) {
      changePage(nextPage, sizePerPage);
    }
  };

  renderControl = (key, type) => (
    <Control
      handleControlSelect={this.selectPageItem}
      type={type}
      controlKey={key}
    />
  );

  renderPageNumberItem = (pageIndex) => {
    const { selectedPage } = this.props;
    const selected = pageIndex === selectedPage;
    return (
      <PageNumber
        key={pageIndex}
        handlePageNumberSelect={this.selectPageItem}
        pageIndex={pageIndex}
        selected={selected}
      />
    );
  };

  renderPageNumbers = () => {
    const { totalPage, selectedPage, siblingCount } = this.props;
    const isAutoWidth = totalPage < siblingCount * 2 + 1;
    const min = Math.max(selectedPage - siblingCount, 1);
    const max = Math.min(selectedPage + siblingCount, totalPage) + 1;
    const arr = _range(min, max, 1);

    const arrLength = arr.length;
    if (arrLength < siblingCount * 2 + 1) {
      // handle min range
      const offset = selectedPage - 1 - siblingCount;
      const lastVisiblePage = arr[arrLength - 1];
      const maxRange = lastVisiblePage + Math.abs(offset);

      if (offset < 0) {
        arr.push(
          ..._range(lastVisiblePage + 1, Math.min(maxRange, totalPage) + 1),
        );
      }
      // handle max range
      const total = selectedPage + siblingCount;
      const firstVisiblePage = arr[0];
      const minRange = firstVisiblePage - (total - totalPage);
      if (total > totalPage) {
        arr.unshift(..._range(Math.max(minRange, 1), firstVisiblePage));
      }
    }
    return (
      <PaginationWrapperStyled>
        {this.renderDots('left', arr)}
        <PaginationContentWrapperStyled isAutoWidth={isAutoWidth}>
          {arr.map(this.renderPageNumberItem)}
        </PaginationContentWrapperStyled>
        {this.renderDots('right', arr)}
      </PaginationWrapperStyled>
    );
  };

  renderDots = (side, arr) => {
    const { totalPage } = this.props;
    let shouldRenderDots = false;
    switch (side) {
      case 'left':
        shouldRenderDots = arr[0] > 1;
        break;
      case 'right':
        shouldRenderDots = arr[arr.length - 1] < totalPage;
        break;
      default:
        break;
    }
    return shouldRenderDots && <DotsStyled>...</DotsStyled>;
  };

  render() {
    return (
      <PaginationBarStyled>
        {this.renderControl('first', 'text')}
        {this.renderControl('prev', 'icon')}
        {this.renderPageNumbers()}
        {this.renderControl('next', 'icon')}
        {this.renderControl('last', 'text')}
      </PaginationBarStyled>
    );
  }
}

PaginationBar.propTypes = {
  totalPage: PropTypes.number,
  siblingCount: PropTypes.number,
  selectedPage: PropTypes.number.isRequired, // It's controlled field, please enter value between page range
  changePage: PropTypes.any,
  sizePerPage: PropTypes.number.isRequired,
};

PaginationBar.defaultProps = {
  totalPage: 0,
  siblingCount: 4,
};

export default PaginationBar;
