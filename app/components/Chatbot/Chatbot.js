/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Layout, Icon, Input, Tooltip,
} from 'antd';
import MessageBox from './MessageBox/MessageBox';
import TicketItem from './TicketItem/TicketItem';
import {
  ChatbotWrapper,
  ChatbotTicketListWrapper,
  ChatbotContentWrapper,
  TicketHeaderWrapper,
  TicketEmpty,
} from './styles';
import { TICKET_STATUS } from '../../../common/enums';
import CreateTicketFormContainer from '../../containers/Chatbot/CreateTicket';

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
        status: TICKET_STATUS.NEW,
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

  renderTicketHeader = () => (
    <TicketHeaderWrapper>
      <Tooltip title="Ticket setting">
        <Icon type="setting" />
      </Tooltip>
      <span>Ticket List</span>
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
    const { ticket, ticketData, isOpenCreateModal } = this.state;
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
            {ticket ? <MessageBox ticket={ticket} /> : <TicketEmpty>Please select a ticket</TicketEmpty>}
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
