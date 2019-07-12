import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import {
  TableContentItem,
} from 'components/TableComponent/TableComponent.styled';
import { TableContent } from 'components/TableComponent/TableComponent';
import { COLUMN_TYPE } from 'utils/constants';

class TableDetailRow extends React.PureComponent {
  renderTextColumn = (column) => {
    const { item } = this.props;
    const { dataKey } = column;

    return _get(item, dataKey);
  }

  renderColumnContent = (column) => {
    const { type } = column;

    switch (type) {
      case COLUMN_TYPE.TEXT:
      default:
        return this.renderTextColumn(column);
    }
  }

  renderColumn = (column) => {
    const { contentPropertise } = column;

    return (
      <TableContent {...contentPropertise}>
        {this.renderColumnContent(column)}
      </TableContent>
    );
  }

  render() {
    const { columns } = this.props;

    return (
      <TableContentItem>
        {columns.map(this.renderColumnContent)}
      </TableContentItem>
    );
  }
}

TableDetailRow.propTypes = {
  columns: PropTypes.array,
  item: PropTypes.object,
};

export default TableDetailRow;
