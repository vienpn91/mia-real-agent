/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Icon, Input, Tooltip, Tabs,
} from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import ConversationList from 'containers/ConversationList';
import history from 'utils/history';
import { Return } from 'components/Generals/General.styled';
import MessageBoxContainer from '../../containers/Chatbot/MessageBox';
import {
  ChatbotWrapper,
  ChatbotConversationListWrapper,
  ChatbotContentWrapper,
  ConversationHeaderWrapper,
  ConversationEmpty,
} from './Chatbot.styled';
import CreateConversationFormContainer from '../../containers/Chatbot/CreateTicket';
import EditConversationContainer from '../../containers/Chatbot/EditTicket';

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

export default class ChatbotComponent extends Component {
  state = {
    isOpenCreateModal: false,
    isOpenSettingModal: false,
    settingChosenConversation: null,
  }

  static propTypes = {
    userRole: PropTypes.string.isRequired,
    isFetchingList: PropTypes.bool,
    isFetchingConversation: PropTypes.bool,
    total: PropTypes.number,
    errorMsg: PropTypes.string,
    chatLog: PropTypes.arrayOf(PropTypes.object),
    currentConversation: PropTypes.objectOf(PropTypes.any),
    selectConversation: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isFetchingList: false,
    isFetchingConversation: false,
    total: 0,
    errorMsg: '',
    chatLog: [],
    currentConversation: null,
  }

  componentDidMount = () => {
    const { currentConversation, selectConversation } = this.props;
    if (!currentConversation) {
      selectConversation(id);
      return;
    }
    const id = _get(this.props, 'match.params.id', null);
    // const ticketId = _get(this.props, 'match.params.ticketId', null);

    // eslint-disable-next-line no-underscore-dangle
    if (id !== currentConversation._id) {
      selectConversation(id);
    }
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

  handleOpenSettingModal = (ticket) => {
    this.setState({
      isOpenSettingModal: true,
      settingChosenConversation: ticket,
    });
  }

  handleCloseSettingModal = () => {
    this.setState({
      isOpenSettingModal: false,
    });
  }

  goToDashboard = () => {
    history.push('/dashboard');
  }

  renderConversationHeader = () => (
    <ConversationHeaderWrapper>
      <Return onClick={this.goToDashboard}>
        <Icon type="left" />
        <span>MENU</span>
      </Return>
      <Tooltip title="Create ticket">
        <Icon type="edit" onClick={this.handleOpenCreateModal} />
      </Tooltip>
    </ConversationHeaderWrapper>
  );

  renderSearchConversation = () => (
    <ConversationHeaderWrapper search>
      <Search
        placeholder="Search on Conversation"
        onSearch={value => console.log(value)}
      />
    </ConversationHeaderWrapper>
  );

  renderTabItem = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Detail" key="1" />
      <TabPane tab="List" key="2" />
    </Tabs>
  )

  render() {
    const { isOpenCreateModal, isOpenSettingModal, settingChosenConversation } = this.state;
    const { currentConversation, errorMsg } = this.props;

    return (
      <ChatbotWrapper>
        <ChatbotConversationListWrapper>
          {this.renderConversationHeader()}
          {this.renderSearchConversation()}
          <ConversationList />
        </ChatbotConversationListWrapper>
        <ChatbotContentWrapper>
          <Content>
            {
              (!_isEmpty(currentConversation) && !errorMsg)
                ? <MessageBoxContainer ticket={currentConversation} />
                : <ConversationEmpty>Please select a ticket</ConversationEmpty>
            }
          </Content>
        </ChatbotContentWrapper>
        <CreateConversationFormContainer
          isOpen={isOpenCreateModal}
          handleCancel={this.handleCloseCreateModal}
        />
        <EditConversationContainer
          isOpen={isOpenSettingModal}
          ticket={settingChosenConversation}
          handleCancel={this.handleCloseSettingModal}
        />
      </ChatbotWrapper>
    );
  }
}
