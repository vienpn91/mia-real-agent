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
} from '../Chatbot.styled';
import { ROLES } from '../../../../common/enums';

const categories = [
  'Finance',
  'Law',
  'Insurrance',
];

const widthBreakpoint = 768;
const scrollStyle = {
  height: 'calc(100vh - 250x)',
  width: '100%',
};

const scrollStyleMobile = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

class Tickets extends React.PureComponent {
  componentDidMount() {
    const { getAllAction } = this.props;

    getAllAction();
  }

  selectTicket = (ticket) => {
    const { ticketId, owner } = ticket;
    const { userRole } = this.props;
    history.push(`/ticket/${ticketId}${userRole === ROLES.AGENT ? `/${owner}` : ''}`);
  }

  handleArchiveTicket = (ticketId) => {
    const { archiveTicket } = this.props;
    archiveTicket(ticketId);
  }

  renderTicketItem = (ticket) => {
    const { openSetting, userRole } = this.props;
    const { _id, ticketId } = ticket;
    return (
      <Menu.Item key={_id} onClick={() => this.selectTicket(ticket)}>
        <TicketItem
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
    const { tickets } = this.props;
    return (

      <MediaQuery maxWidth={widthBreakpoint}>
        {matches => (
          <ShadowScrollbars autoHide style={matches ? scrollStyleMobile : scrollStyle}>
            <Menu>
              {tickets.map(this.renderTicketItem)}
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
        total={15}
      />
    </TicketPaginationWrapper>
  )

  render() {
    const { fetchingContext = {}, isArchiving } = this.props;
    const { isFetching } = fetchingContext;
    const loading = isFetching || isArchiving;
    if (loading) {
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

Tickets.propTypes = {
  isArchiving: bool.isRequired,
  tickets: PropTypes.array,
  getAllAction: PropTypes.func,
  fetchingContext: PropTypes.object,
  userRole: string.isRequired,
  openSetting: func,
  archiveTicket: func.isRequired,
};

export default Tickets;
