import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableHeadWrapper,
  TableContentWrapper,
} from 'components/TableComponent/TableComponent.styled';
import {
  TableHeader,
} from 'components/TableComponent/TableComponent';
import {
  TableDetailWrapper,
} from './TableDetail.styled';
import TableDetailRow from './TableDetailRow';

class TableDetail extends Component {
  renderColumnItem = column => (
    <TableHeader {...column.headerPropertise} />
  )

  renderTableHeader = () => {
    const { columns } = this.props;

    return (
      <TableHeadWrapper bgTable>
        {columns.map(this.renderColumnItem)}
      </TableHeadWrapper>
    );
  }

  renderItem = (item, index) => (
    <TableDetailRow item={item} key={index} index={index} />
  );

  render() {
    const { items } = this.props;

    return (
      <TableDetailWrapper>
        {this.renderTableHeader()}
        <TableContentWrapper bgTable>
          {items.map(this.renderItem)}
        </TableContentWrapper>
      </TableDetailWrapper>
    );
  }
}

TableDetail.propTypes = {
  columns: PropTypes.array,
  items: PropTypes.array,
};

export default TableDetail;
