import React from 'react';
import PropTypes from 'prop-types';
import { modalName } from 'reducers/modal';
import {
  TableHeaderSortWrapper,
  TableHeaderSortTitle,
  TableHeaderSortContent,
} from '../Generals/TableHeader.styled';

const { MODAL_EXPORT_EXCEL } = modalName;

class SortContainer extends React.PureComponent {
  handleSort = (value) => {
    const { handleSort, sorting } = this.props;
    const { field, order } = sorting;

    const payload = {
      field: value,
      order: field === value ? -order : 1,
    };

    handleSort(payload);
  };

  openExportExcelModal = () => {
    const { openModal } = this.props;

    openModal(MODAL_EXPORT_EXCEL);
  };

  renderIcon = order => order === 1 ? (
    <i className="icon-caret-up" />
  ) : (
    <i className="icon-caret-down" />
  );

  renderSortItem = (item) => {
    const {
      sorting: { field, order },
    } = this.props;
    const { title, value } = item;
    const isSelected = field === value;
    return (
      <TableHeaderSortContent
        key={value}
        onClick={() => this.handleSort(value)}
      >
        {title}
        {isSelected && this.renderIcon(order)}
      </TableHeaderSortContent>
    );
  };

  render() {
    const { sortItem } = this.props;
    return (
      <TableHeaderSortWrapper>
        <TableHeaderSortTitle>Sort By</TableHeaderSortTitle>
        {sortItem.map(this.renderSortItem)}
        <TableHeaderSortTitle>More Actions</TableHeaderSortTitle>
        <TableHeaderSortContent onClick={this.openExportExcelModal}>
          <i className="icon-export" aria-hidden="true" />
          Export Excel
        </TableHeaderSortContent>
      </TableHeaderSortWrapper>
    );
  }
}

SortContainer.propTypes = {
  sortItem: PropTypes.array,
  handleSort: PropTypes.func.isRequired,
  sorting: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default SortContainer;
