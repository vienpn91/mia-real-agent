/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {
  Layout, Menu, Breadcrumb, Icon, Input,
  Avatar,
} from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import MessageBox from './MessageBox';
import {
  ChatbotWrapper,
  ChatbotMessengerListWrapper,
  ChatbotContentWrapper,
  MessengerHeaderWrapper,
  MessengerGroup,
  MessengerUserName,
  MessengerTime,
  SubMessage,
} from './styles';

const { Content } = Layout;
const { Search } = Input;

const scrollStyle = {
  height: 'calc(100% - 120px)',
  width: '100%',
};

const scrollStyleMobile = {
  height: 'calc(100% - 60px)',
  width: '100%',
}

const messengerData = [
  {
    userName: 'Dat 09',
    userAvatar: 'user',
    subMessage: 'Today i will buy my company',
    lastestTime: '9:32',
  },
  {
    userName: 'Long Hòn',
    userAvatar: 'user',
    subMessage: 'Today i will delete my project',
    lastestTime: 'Jan 15',
  },
  {
    userName: 'Cồn Lường',
    userAvatar: 'user',
    subMessage: 'Today i will playing game all day',
    lastestTime: 'Mon',
  },
  {
    userName: 'Lu Lu',
    userAvatar: 'user',
    subMessage: 'Today i will buy research all day',
    lastestTime: '12/18/2018',
  },
  {
    userName: 'Tri đẹp trai',
    userAvatar: 'user',
    subMessage: 'Today i will gym all day',
    lastestTime: 'Apr 15',
  },
  {
    userName: 'Phat',
    userAvatar: 'user',
    subMessage: 'Today i will talk all day',
    lastestTime: '15:32',
  },
];

export default class ChatbotComponent extends Component {
  renderMessengerHeader = () => (
    <MessengerHeaderWrapper>
      <Icon type="setting" />
      <span>Messenger</span>
      <Icon type="edit" />
    </MessengerHeaderWrapper>
  );

  renderSearchMessenger = () => (
    <MessengerHeaderWrapper search>
      <Search
        placeholder="Search on Messenger"
        onSearch={value => console.log(value)}
      />
    </MessengerHeaderWrapper>
  )

  renderMessengerList = () => (
    <MediaQuery maxWidth={768}>
      {matches => (
        <ShadowScrollbars autoHide style={matches ? scrollStyleMobile : scrollStyle}>
          <Menu defaultSelectedKeys={['1']}>
            {messengerData.map((message, index) => (
              <Menu.Item key={index}>
                <Avatar icon={message.userAvatar} size="large" />
                <MessengerGroup>
                  <MessengerUserName>{message.userName}</MessengerUserName>
                  <SubMessage>{message.subMessage}</SubMessage>
                </MessengerGroup>
                <MessengerTime>{message.lastestTime}</MessengerTime>
              </Menu.Item>
            ))}
          </Menu>
        </ShadowScrollbars>
      )}
    </MediaQuery>
  );

  render() {
    return (
      <ChatbotWrapper>
        <ChatbotMessengerListWrapper>
          {this.renderMessengerHeader()}
          {this.renderSearchMessenger()}
          {this.renderMessengerList()}
        </ChatbotMessengerListWrapper>
        <ChatbotContentWrapper>
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item>Message Name</Breadcrumb.Item>
            </Breadcrumb>
            <MessageBox />
          </Content>
        </ChatbotContentWrapper>
      </ChatbotWrapper>
    );
  }
}
