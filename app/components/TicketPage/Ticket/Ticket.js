/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { columnSizeHead } from './ColumnSize';
import TicketItem from './TicketItem/TicketItem';
import { TicketWrapper } from '../Ticket.styles';
import {
  TableHeadWrapper,
  TableContentWrapper,
  TableEmptyContent,
} from '../../TableComponent/TableComponent.styled';
import { TableHeader } from '../../TableComponent/TableComponent';
import { TICKET_STATUS } from '../../../../common/enums';

const isNoTicket = false;

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

const randomActivityStatus = () => {
  const activity = [];
  activity.push(activityData[Math.floor(Math.random() * activityData.length)]);
  return activity;
};

const ticketData = [
  {
    title: 'User should be able to chat with other agent',
    ticketId: '#10',
    userName: 'longhp',
    ticketStatus: TICKET_STATUS.PROCESSING,
    activityStatus: randomActivityStatus(),
    modifiedTime: '1 minute',
  },
  {
    title: 'User should be able to chat with other agent',
    ticketId: '#11',
    userName: 'longhp',
    ticketStatus: TICKET_STATUS.SEARCHING,
    activityStatus: randomActivityStatus(),
    modifiedTime: 'yesterday',
  },
  {
    title: 'User should be able to chat with other agent',
    ticketId: '#12',
    userName: 'longhp',
    ticketStatus: TICKET_STATUS.PROCESSING,
    activityStatus: randomActivityStatus(),
    modifiedTime: '23 hours',
  },
  {
    title: 'User should be able to chat with other agent',
    ticketId: '#13',
    userName: 'longhp',
    ticketStatus: TICKET_STATUS.PENDING,
    activityStatus: randomActivityStatus(),
    modifiedTime: '10 days',
  },
  {
    title: 'User should be able to chat with other agent',
    ticketId: '#14',
    userName: 'longhp',
    ticketStatus: TICKET_STATUS.RESOLVED,
    activityStatus: randomActivityStatus(),
    modifiedTime: 'Apr 19',
  },
];


export default class Ticket extends Component {
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

  renderTicketItem = (value, index) => <TicketItem value={value} index={index} />;

  renderTicketTableContent = () => (
    <TableContentWrapper bgTable>
      {isNoTicket
        ? <TableEmptyContent>No SKU Yet</TableEmptyContent>
        : ticketData.map(this.renderTicketItem)
      }
    </TableContentWrapper>
  )

  render() {
    return (
      <TicketWrapper>
        {this.renderTicketTableHead()}
        {this.renderTicketTableContent()}
      </TicketWrapper>
    );
  }
}
