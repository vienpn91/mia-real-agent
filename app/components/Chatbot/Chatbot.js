/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Layout, Icon, Input, Tooltip,
} from 'antd';
import { func, shape } from 'prop-types';
import MessageBoxContainer from '../../containers/Chatbot/MessageBox';
import TicketItem from './TicketItem/TicketItem';
import {
  ChatbotWrapper,
  ChatbotTicketListWrapper,
  ChatbotContentWrapper,
  TicketHeaderWrapper,
  TicketEmpty,
} from './styles';
import { Return } from '../Generals/general.styles';
import { TICKET_STATUS } from '../../../common/enums';
import CreateTicketFormContainer from '../../containers/Chatbot/CreateTicket';
import history from '../../utils/history';

const { Content } = Layout;
const { Search } = Input;

const categories = [
  'Finance',
  'Law',
  'Insurrance',
];

const randomCategory = () => {
  const category = [];
  category.push(categories[Math.floor(Math.random() * categories.length)]);
  return category;
};

export default class ChatbotComponent extends Component {
  state = {
    ticket: null,
    ticketData: [
      {
        title: 'This is ticket 1',
        assignee: 'Dat 09',
        userAvatar: 'user',
        lastestTime: '9:32',
        category: randomCategory(),
        status: TICKET_STATUS.OPEN,
      },
      {
        title: 'This is ticket 2',
        assignee: 'Long Hòn',
        userAvatar: 'user',
        lastestTime: 'Jan 15',
        category: randomCategory(),
        status: TICKET_STATUS.RESOLVED,
      },
      {
        title: 'This is ticket 3',
        assignee: 'Cồn Lường',
        userAvatar: 'user',
        lastestTime: 'Mon',
        category: randomCategory(),
        status: TICKET_STATUS.CLOSED,
      },
      {
        title: 'This is ticket 4',
        assignee: 'Lu Lu',
        userAvatar: 'user',
        lastestTime: '12/18/2018',
        category: randomCategory(),
        status: TICKET_STATUS.PENDING,
      },
      {
        title: 'This is ticket 5',
        assignee: 'Tri đẹp trai',
        userAvatar: 'user',
        lastestTime: 'Apr 15',
        category: randomCategory(),
        status: TICKET_STATUS.PROCESSING,
      },
      {
        title: 'This is ticket 6',
        assignee: 'Phat',
        userAvatar: 'user',
        lastestTime: '15:32',
        category: randomCategory(),
        status: TICKET_STATUS.SEARCHING,
      },
    ],
    isOpenCreateModal: false,
  }

  static propTypes = {
    getTicket: func.isRequired,
    ticketDetail: shape(),
  }

  static defaultProps = {
    ticketDetail: null,
  }

  componentDidMount = () => {
    const { getTicket } = this.props;
    getTicket('5d11e3bd82125b32a52683bc');
  }

  handleSelectTicket = (ticket) => {
    this.setState({
      ticket,
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

  createTicket = () => {
    const { ticketData } = this.state;
    this.setState({
      ticketData: [...ticketData, {
        title: `This is ticket ${ticketData.length + 1}`,
        assignee: `Assignee random ${ticketData.length + 1}`,
        userAvatar: 'user',
        lastestTime: 'Today',
        category: randomCategory(),
        status: TICKET_STATUS.NEW,
      }],
    });
  }

  goBack = () => (history.goBack());

  renderTicketHeader = () => (
    <TicketHeaderWrapper>
      <Return onClick={this.goBack}>
        <Icon type="left" />
        <span>MENU</span>
      </Return>
      <Tooltip title="Create ticket">
        <Icon type="edit" onClick={this.handleOpenCreateModal} />
      </Tooltip>
    </TicketHeaderWrapper>
  );

  renderSearchTicket = () => (
    <TicketHeaderWrapper search>
      <Search
        placeholder="Search on Ticket"
        onSearch={value => console.log(value)}
      />
    </TicketHeaderWrapper>
  )

  render() {
    const {
      ticket, ticketData, isOpenCreateModal,
    } = this.state;
    const { ticketDetail } = this.props;
    return (
      <ChatbotWrapper>
        <ChatbotTicketListWrapper>
          {this.renderTicketHeader()}
          {this.renderSearchTicket()}
          <TicketItem
            ticketData={ticketData}
            ticket={ticket}
            categories={categories}
            handleSelectTicket={this.handleSelectTicket}
          />
        </ChatbotTicketListWrapper>
        <ChatbotContentWrapper>
          <Content>
            {ticketDetail ? <MessageBoxContainer ticket={ticketDetail} /> : <TicketEmpty>Please select a ticket</TicketEmpty>}
          </Content>
        </ChatbotContentWrapper>
        <CreateTicketFormContainer
          isOpen={isOpenCreateModal}
          handleCancel={this.handleCloseCreateModal}
        />
      </ChatbotWrapper>
    );
  }
}
