/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Ticket from 'components/TicketPage/Ticket';
import {
  TicketPageWrapper,
  TicketFilterWrapper,
  FilterItem,
  Filter,
  CreateItem,
} from './Ticket.styles';
import { DefaultButton } from '../Generals/general.styles';

const fiterOption = [
  'Your ticket',
  'Everything assigned to you',
  'Everything mentioning you',
];

export default class TicketPage extends Component {
  menu = () => (
    <Menu>
      {fiterOption.map((status, index) => (
        <Menu.Item key={index}>
          <span>{status}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  renderSelectStatus = () => (
    <Dropdown overlay={this.menu} trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        Filter
        <Icon type="caret-down" />
      </a>
    </Dropdown>
  )

  renderFilterTicket = () => (
    <TicketFilterWrapper>
      <FilterItem>
        <Filter>
          {this.renderSelectStatus()}
        </Filter>
        <input type="text" />
      </FilterItem>
      <CreateItem>
        <DefaultButton>Create Ticket</DefaultButton>
      </CreateItem>
    </TicketFilterWrapper>
  )

  render() {
    return (
      <TicketPageWrapper>
        {this.renderFilterTicket()}
        <Ticket />
      </TicketPageWrapper>
    );
  }
}