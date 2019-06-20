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
        subMessage: 'Today i will buy my company',
        lastestTime: '9:32',
        category: randomCategory(),
      },
      {
        title: 'This is ticket 2',
        assignee: 'Long Hòn',
        userAvatar: 'user',
        subMessage: 'Today i will delete my project',
        lastestTime: 'Jan 15',
        category: randomCategory(),
      },
      {
        title: 'This is ticket 3',
        assignee: 'Cồn Lường',
        userAvatar: 'user',
        subMessage: 'Today i will playing game all day',
        lastestTime: 'Mon',
        category: randomCategory(),
      },
      {
        title: 'This is ticket 4',
        assignee: 'Lu Lu',
        userAvatar: 'user',
        subMessage: 'Today i will buy research all day',
        lastestTime: '12/18/2018',
        category: randomCategory(),
      },
      {
        title: 'This is ticket 5',
        assignee: 'Tri đẹp trai',
        userAvatar: 'user',
        subMessage: 'Today i will gym all day',
        lastestTime: 'Apr 15',
        category: randomCategory(),
      },
      {
        title: 'This is ticket 6',
        assignee: 'Phat',
        userAvatar: 'user',
        subMessage: 'Today i will talk all day',
        lastestTime: '15:32',
        category: randomCategory(),
      },
    ],
  }

  handleSelectTicket = (ticket) => {
    this.setState({
      ticket,
    });
  }

  createTicket = () => {
    const { ticketData } = this.state;
    this.setState({
      ticketData: [...ticketData, {
        title: `This is ticket ${ticketData.length + 1}`,
        assignee: `Assignee random ${ticketData.length + 1}`,
        userAvatar: 'user',
        subMessage: 'This is ticket random',
        lastestTime: 'Today',
        category: randomCategory(),
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
        <Icon type="edit" onClick={this.createTicket} />
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
    const { ticket, ticketData } = this.state;
    return (
      <ChatbotWrapper>
        <ChatbotTicketListWrapper>
          {this.renderTicketHeader()}
          {this.renderSearchTicket()}
          <TicketItem
            ticketData={ticketData}
            categories={categories}
            handleSelectTicket={this.handleSelectTicket}
          />
        </ChatbotTicketListWrapper>
        <ChatbotContentWrapper>
          <Content>
            {ticket ? <MessageBox ticket={ticket} /> : <TicketEmpty>Please select a ticket</TicketEmpty>}
          </Content>
        </ChatbotContentWrapper>
      </ChatbotWrapper>
    );
  }
}
