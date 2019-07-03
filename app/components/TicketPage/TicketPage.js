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

  renderFilterTicket = () => (
    <TicketFilterWrapper>
      <FilterItem>
        <Filter>
          {this.renderSelectStatus()}
          {this.renderSelectCategory()}
        </Filter>
        <input type="text" placeholder="Search ticket ..." />
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
