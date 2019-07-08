import React from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import ShadowScrollbars from 'components/Scrollbar';
import TableBorder from 'components/TableBorder';
import TableHeaderComponent from './TableHeaderComponent';
import TableRow from './TableRow';

const scrollStyle = {
  height: 'calc(100vh - 210px)',
  width: '100%',
};

class TableManagement extends React.PureComponent {
  componentDidMount() {
    this.props.fetchList();
  }

  goToDetail = (id) => {
    const { endpoint, shouldOpenDetail = true } = this.props;
    if (shouldOpenDetail) {
      history.push(`/${endpoint}/${id}`);
    }
  };

  renderTableItem = (item) => {
    const { columns, shouldOpenDetail = true } = this.props;
    const { _id } = item;

    return (
      <TableRow
        columns={columns}
        item={item}
        key={_id}
        onClick={this.goToDetail}
        isPointer={shouldOpenDetail}
      />
    );
  };

  render() {
    const {
      items,
      columns,
      // for TableBorder
      isLoading,
      totalCount,
      selectedPage,
      sizePerPage,
      changePage,
    } = this.props;
    const size = items.length;
    return (
      <TableBorder
        size={size}
        isLoading={isLoading}
        totalCount={totalCount}
        selectedPage={selectedPage}
        changePage={changePage}
        sizePerPage={sizePerPage}
      >
        <TableHeaderComponent columns={columns} />
        <ShadowScrollbars style={scrollStyle}>
          {items.map(this.renderTableItem)}
        </ShadowScrollbars>
      </TableBorder>
    );
  }
}

TableManagement.propTypes = {
  fetchList: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  endpoint: PropTypes.string,
  changePage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  shouldOpenDetail: PropTypes.bool,
};

export default TableManagement;
