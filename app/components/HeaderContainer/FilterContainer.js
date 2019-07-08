import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHeaderFilterWrapper,
  TableHeaderSortTitle,
  TableHeaderSortContent,
} from 'components/Generals/TableHeader.styled';

class FilterContainer extends React.PureComponent {
  handleFilter = (item) => {
    const { handleFilter } = this.props;

    handleFilter(item);
  };

  renderFilterItem = (item) => {
    const { title, value } = item;
    return (
      <TableHeaderSortContent
        key={value}
        onClick={() => this.handleFilter(item)}
      >
        {title}
      </TableHeaderSortContent>
    );
  };

  render() {
    const { filterItems } = this.props;
    return (
      <TableHeaderFilterWrapper>
        <TableHeaderSortTitle>Filter By</TableHeaderSortTitle>
        {filterItems.map(this.renderFilterItem)}
      </TableHeaderFilterWrapper>
    );
  }
}

FilterContainer.propTypes = {
  filterItems: PropTypes.array,
  handleFilter: PropTypes.func.isRequired,
};

export default FilterContainer;
