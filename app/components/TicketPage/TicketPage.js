/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes, { number } from 'prop-types';
import {
  Menu, Dropdown, Icon,
  Pagination,
} from 'antd';
import Ticket from 'containers/TicketPage/Ticket';
import {
  TicketPageWrapper,
  TicketFilterWrapper,
  FilterItem,
  Filter,
  CreateItem,
  TicketPaginationWrapper,
} from './Ticket.styles';
import { DefaultButton } from '../Generals/general.styles';
import CreateTicketFormContainer from '../../containers/Chatbot/CreateTicket';
import { PAGE_SIZE } from '../../../common/enums';

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
    current: 1,
    isOpenCreateModal: false,
  }

  componentDidMount() {
    const { getAllAction } = this.props;
    getAllAction({ skip: 0, limit: PAGE_SIZE });
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { getAllAction } = this.props;
    const { current } = this.state;
    if (prevState.current !== current) {
      getAllAction({ skip: (current - 1) * PAGE_SIZE, limit: PAGE_SIZE });
    }
  }

  handleChangePage = (current) => {
    console.log(this.props);
    this.setState({
      current,
    });
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
    const { isOpenCreateModal, current } = this.state;
    const { totalRecord } = this.props;
    return (
      <TicketPageWrapper>
        {this.renderFilterTicket()}
        <Ticket />
        <TicketPaginationWrapper>
          <Pagination
            onChange={this.handleChangePage}
            current={current}
            showLessItems
            size="small"
            pageSize={PAGE_SIZE}
            total={totalRecord}
          />
        </TicketPaginationWrapper>
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
  totalRecord: number.isRequired,
};

export default TicketPage;
