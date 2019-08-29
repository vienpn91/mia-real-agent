import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableHeadWrapper,
  TableContentWrapper,
  TableEmptyContent,
} from 'components/TableComponent/TableComponent.styled';
import {
  TableHeader,
} from 'components/TableComponent/TableComponent';
import {
  TableDetailWrapper,
} from './TableDetail.styled';
import TableDetailRow from './TableDetailRow';

class TableDetail extends Component {
  renderColumnItem = (column, index) => (
    <TableHeader {...column.headerPropertise} key={index} />
  )

  renderTableHeader = () => {
    const { columns } = this.props;

    return (
      <TableHeadWrapper>
        {columns.map(this.renderColumnItem)}
      </TableHeadWrapper>
    );
  }

  renderItem = (item, index) => {
    const { columns } = this.props;

    return (
      <TableDetailRow item={item} key={index} index={index} columns={columns} />
    );
  }

  render() {
    const { items, emptyMsg } = this.props;
    const isEmpty = items.length === 0;

    return (
      <TableDetailWrapper>
        {this.renderTableHeader()}
        <TableContentWrapper>
          {isEmpty && <TableEmptyContent>{emptyMsg}</TableEmptyContent>}
          {!isEmpty && items.map(this.renderItem)}
        </TableContentWrapper>
      </TableDetailWrapper>
    );
  }
}

TableDetail.propTypes = {
  columns: PropTypes.array,
  items: PropTypes.array,
  emptyMsg: PropTypes.string,
};

export default TableDetail;
