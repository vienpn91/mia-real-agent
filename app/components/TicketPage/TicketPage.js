/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes, { number, shape } from 'prop-types';
import {
  Menu, Dropdown, Icon,
  Pagination,
} from 'antd';
import Ticket from 'containers/TicketPage/Ticket';
import _isNumber from 'lodash/isNumber';
import { DefaultButton } from 'components/Generals/General.styled';
import {
  TicketPageWrapper,
  TicketFilterWrapper,
  FilterItem,
  Filter,
  CreateItem,
  TicketPaginationWrapper,
} from './Ticket.styles';
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
    isOpenCreateModal: false,
  }

  componentDidMount() {
    const { getAllAction, match, history } = this.props;
    getAllAction({ skip: 0, limit: PAGE_SIZE });
    const { params } = match;
    const { tab, page } = params;
    if (page && _isNumber(page)) {
      getAllAction({ skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE });
    } else {
      history.push(`/dashboard/${tab}/1`);
    }
  }

  componentDidUpdate = (prevProps) => {
    const { getAllAction, match } = this.props;
    const { params } = match;
    const { page } = params;
    if (prevProps.match.params.page !== page) {
      getAllAction({ skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE });
    }
  }

  handleChangePage = (current) => {
    const { history, match } = this.props;
    const { params } = match;
    const { tab } = params;
    history.push(`/dashboard/${tab}/${current}`);
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
    const { totalRecord, match } = this.props;
    const { params } = match;
    const { page } = params;
    return (
      <TicketPageWrapper>
        {this.renderFilterTicket()}
        <Ticket />
        <TicketPaginationWrapper>
          <Pagination
            onChange={this.handleChangePage}
            current={_isNumber(page) ? page : 0}
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
  history: shape(),
  match: shape(),
};

export default TicketPage;
