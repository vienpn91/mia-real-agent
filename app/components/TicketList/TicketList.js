import React from 'react';
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

class TicketList extends React.PureComponent {
  componentDidMount = () => {
    const { fetchListAction } = this.props;
    fetchListAction();
  }

  handleSelectTicket = (conversationId) => {
    const { selectConversation } = this.props;
    selectConversation(conversationId);
    history.push(`/conversation/${conversationId}`);
  }

  renderTicketItem = (ticket, index) => {
    const { openSetting, userRole } = this.props;
    const { _id: ticketId, conversationId } = ticket;
    return (
      <Menu.Item key={ticketId} onClick={() => this.handleSelectTicket(conversationId)}>
        <TicketItem
          number={index + 1}
          userRole={userRole}
          ticket={ticket}
          onRemove={() => this.handleRemoveTicket(ticketId)}
          onArchive={() => this.handleArchiveTicket(ticketId)}
          openSetting={openSetting}
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
  renderTicketPagination = () => (
    <TicketPaginationWrapper>
      <Pagination
        current={1}
        showLessItems
        size="small"
        pageSize={5}
        total={this.props.total}
      />
    </TicketPaginationWrapper>
  )

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
  fetchListAction: PropTypes.func.isRequired,
  ticketList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TicketList;
