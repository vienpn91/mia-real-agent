import React from 'react';
import PropTypes from 'prop-types';
import { TableHeader } from 'components/TableComponent/TableComponent';
import {
  TableHeadWrapper,
  TableHeadItemGroup,
} from 'components/TableComponent/TableComponent.styled';

class TableHeaderComponent extends React.PureComponent {
  renderColumn = (column, index) => {
    const { columnAttr } = column;
    return <TableHeader {...columnAttr} key={index} />;
  };

  render() {
    const { columns } = this.props;

    return (
      <TableHeadWrapper>
        <TableHeader size="40" />
        <TableHeadItemGroup>
          {columns.map(this.renderColumn)}
        </TableHeadItemGroup>
      </TableHeadWrapper>
    );
  }
}

TableHeaderComponent.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default TableHeaderComponent;
