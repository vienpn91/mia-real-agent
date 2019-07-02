/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import Ticket from 'containers/TicketPage/Ticket';
import {
  TicketPageWrapper,
  TicketFilterWrapper,
  FilterItem,
  Filter,
  CreateItem,
} from './Ticket.styles';
import { DefaultButton } from '../Generals/general.styles';
import CreateTicketFormContainer from '../../containers/Chatbot/CreateTicket';

const fiterOption = [
  'Your ticket',
  'Everything assigned to you',
  'Everything mentioning you',
];

class TicketPage extends PureComponent {
  state = {
    isOpenCreateModal: false,
  }

  componentDidMount() {
    const { getAllAction } = this.props;

    getAllAction();
  }

  handleOpenCreateModal = () => {
    this.setState({
      isOpenCreateModal: true,
    });
  }

  handleCloseCreateModal = () => {
    this.setState({
      isOpenCreateModal: false,
    });
  }


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
        <DefaultButton onClick={this.handleOpenCreateModal}>Create Ticket</DefaultButton>
      </CreateItem>
    </TicketFilterWrapper>
  )

  render() {
    const { isOpenCreateModal } = this.state;

    return (
      <TicketPageWrapper>
        {this.renderFilterTicket()}
        <Ticket />
        <CreateTicketFormContainer
          isOpen={isOpenCreateModal}
          handleCancel={this.handleCloseCreateModal}
        />
      </TicketPageWrapper>
    );
  }
}

TicketPage.propTypes = {
  getAllAction: PropTypes.func,
};

export default TicketPage;
