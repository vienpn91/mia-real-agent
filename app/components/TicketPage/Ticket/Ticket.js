/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import SpinnerLoading from 'components/PageLoading';
import { columnSizeHead } from './ColumnSize';
import TicketItem from './TicketItem/TicketItem';
import { TicketWrapper } from '../Ticket.styles';
import {
  TableHeadWrapper,
  TableContentWrapper,
  TableEmptyContent,
} from '../../TableComponent/TableComponent.styled';
import { TableHeader } from '../../TableComponent/TableComponent';

const activityData = [
  'Created',
  'Closed',
  'Assigned',
];

const categories = [
  'Finance',
  'Law',
  'Insurrance',
];


class Ticket extends Component {
  filterStatus = () => (
    <Menu>
      {activityData.map((status, index) => (
        <Menu.Item key={index}>
          <span>{status}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  filterCategory = () => (
    <Menu>
      {categories.map((status, index) => (
        <Menu.Item key={index}>
          <span>{status}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  renderSelectStatus = () => (
    <Dropdown overlay={this.filterStatus} trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        Status
        <Icon type="caret-down" />
      </a>
    </Dropdown>
  )


  renderSelectCategory = () => (
    <Dropdown overlay={this.filterCategory} trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        Categories
        <Icon type="caret-down" />
      </a>
    </Dropdown>
  )

  renderTicketTableHead = () => (
    <TableHeadWrapper>
      <TableHeader {...columnSizeHead[0]}>
        <input type="checkbox" />
      </TableHeader>
      <TableHeader {...columnSizeHead[1]}>
        {this.renderSelectStatus()}
      </TableHeader>
      <TableHeader {...columnSizeHead[2]}>
        {this.renderSelectCategory()}
      </TableHeader>
    </TableHeadWrapper>
  );

  renderTicketItem = (ticket, index) => <TicketItem ticket={ticket} index={index} />;

  renderTicketTableContent = () => {
    const { tickets, fetchingContext } = this.props;
    const { isFetching = false } = fetchingContext;

    if (isFetching) {
      return (
        <TableContentWrapper>
          <SpinnerLoading />
        </TableContentWrapper>
      );
    }

    const isNoTicket = tickets.length === 0;
    return (
      <TableContentWrapper bgTable>
        {isNoTicket
          ? <TableEmptyContent>No tickets available, click here to create one</TableEmptyContent>
          : tickets.map(this.renderTicketItem)
        }
      </TableContentWrapper>
    );
  }

  render() {
    return (
      <TicketWrapper>
        {this.renderTicketTableHead()}
        {this.renderTicketTableContent()}
      </TicketWrapper>
    );
  }
}

Ticket.propTypes = {
  tickets: PropTypes.array,
  fetchingContext: PropTypes.object,
};

export default Ticket;
