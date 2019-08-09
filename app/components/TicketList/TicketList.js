import React from 'react';
import _isNumber from 'lodash/isNumber';
import PropTypes, { string, func, bool } from 'prop-types';
import SpinnerLoading from 'components/PageLoading';
import ShadowScrollbars from 'components/Scrollbar';
import MediaQuery from 'react-responsive';
import history from 'utils/history';
import {
  Menu, Select, Pagination,
} from 'antd';
import TicketItem from './TicketItem';
import {
  TicketItemWrapper,
  TicketFilterWrapper,
  TicketPaginationWrapper,
} from './TicketList.styled';

const categories = [
  'Finance',
  'Law',
  'Insurrance',
];

const widthBreakpoint = 768;
const scrollStyle = {
  height: 'calc(100vh - 250px)',
  width: '100%',
};

const scrollStyleMobile = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

const PAGE_SIZE = 10;

class TicketList extends React.PureComponent {
  state = {
    page: 0,
  }

  componentDidMount = () => {
    const { getAllTicketAction } = this.props;
    getAllTicketAction({ skip: 0, limit: PAGE_SIZE });
  }

  componentDidUpdate = () => {
    const { page } = this.state;
    const { total } = this.props;
    if (page === 0 && total > 0) {
      this.setState({
        page: 1,
      });
    }
  }

  handleChangePage = (current) => {
    const { page } = this.state;
    const { getAllTicketAction } = this.props;
    if (page && _isNumber(page)) {
      getAllTicketAction({ skip: (current - 1) * PAGE_SIZE, limit: PAGE_SIZE });
    }
    this.setState({
      page: current,
    });
  }

  handleSelectTicket = (conversationId) => {
    const { selectConversation } = this.props;
    const { location } = history;
    const url = `/conversation/${conversationId}`;
    if (url !== location.pathname) {
      selectConversation(conversationId);
      history.push(url);
    }
  }

  renderTicketItem = (ticket, index) => {
    const { openSetting, userRole, closeAction } = this.props;
    const { _id: ticketId, conversationId } = ticket;
    return (
      <Menu.Item key={ticketId} onClick={() => this.handleSelectTicket(conversationId)}>
        <TicketItem
          number={index + 1}
          userRole={userRole}
          ticket={ticket}
          onClose={closeAction}
        // onRemove={() => this.handleRemoveTicket(ticketId)}
        // onArchive={() => this.handleArchiveTicket(ticketId)}
        // openSetting={openSetting}
        />
      </Menu.Item>
    );
  }

  renderTicketList = () => {
    const { ticketList } = this.props;

    return (

      <MediaQuery maxWidth={widthBreakpoint}>
        {matches => (
          <ShadowScrollbars autoHide style={matches ? scrollStyleMobile : scrollStyle}>
            <Menu>
              {ticketList.map(this.renderTicketItem)}
            </Menu>
          </ShadowScrollbars>
        )}
      </MediaQuery>
    );
  }

  renderTicketFilter = () => (
    <TicketFilterWrapper>
      <span>Filter by categories:</span>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        onChange={this.handleChangeFilter}
      >
        {categories.map((cat, index) => (
          <Select.Option key={index} value={cat}>{cat}</Select.Option> // eslint-disable-line
        ))}
      </Select>
    </TicketFilterWrapper>
  )

  // should apply later
  renderTicketPagination = () => {
    const { total } = this.props;
    const { page } = this.state;
    return (
      <TicketPaginationWrapper>
        <Pagination
          onChange={this.handleChangePage}
          current={_isNumber(page) ? page : 0}
          showLessItems
          size="small"
          pageSize={10}
          total={total}
        />
      </TicketPaginationWrapper>
    );
  }

  render() {
    const { isFetchingList = {} } = this.props;
    if (isFetchingList) {
      return <SpinnerLoading />;
    }

    return (
      <TicketItemWrapper>
        {this.renderTicketList()}
        {this.renderTicketFilter()}
        {this.renderTicketPagination()}
      </TicketItemWrapper>
    );
  }
}

TicketList.propTypes = {
  userRole: PropTypes.string.isRequired,
  isFetchingList: PropTypes.bool,
  total: PropTypes.number,
  selectConversation: PropTypes.func.isRequired,
  openSetting: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired,
  getAllTicketAction: PropTypes.func.isRequired,
  ticketList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TicketList;
