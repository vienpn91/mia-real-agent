import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Breadcrumb,
  Button, Form,
} from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
// import ConversationDetail from '../ConversationDetail';
import {
  MessageBoxWrapper,
  MessageBoxContent,
  MessageBoxItem,
  MessageBoxHeaderWrapper,
  MessageText,
  MessageInputWrapper,
  MessageActionWrapper,
  MessageInput,
  MessageEmpty,
  InputAction,
  UserMessage,
  InfoNotification,
  RatingWrapper,
  RatingContent,
  CommentInputWrapper,
  TicketStatus,
  MessageBoxSystemNotification,
  IsTypingWrapper,
  MessageBoxItemIsTyping,
} from './styles';
import LoadingSpin from '../Loading';
import ConversationDetail from '../ConversationDetail/ConversationDetail';
import { TICKET_STATUS, ROLES } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';
import { insertSystemMessageToRepliesChat, combineChat } from './utils';
import { shouldShowSystemMessage, isAgent } from '../../utils/func-utils';

const scrollStyle = {
  height: '94%',
  width: '100%',
};

const initialValues = {
  content: '',
};

export default class MessageBox extends Component {
  messagesEndRef = React.createRef();

  static propTypes = {
    userId: PropTypes.string.isRequired,
    conversationId: PropTypes.string,
    systemMessage: PropTypes.object,
    fetchReplyMessages: PropTypes.func.isRequired,
    currentConversation: PropTypes.object,
    currentTicket: PropTypes.object,
    isFetchingReplies: PropTypes.bool,
    isFindingAgent: PropTypes.bool,
    replyMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessageErrors: PropTypes.objectOf(PropTypes.any),
    otherUserTyping: PropTypes.object,

    findAgentRequest: PropTypes.func.isRequired,
    sendReplyMessage: PropTypes.func.isRequired,
    setCurrentTicket: PropTypes.func.isRequired,
    joinConversation: PropTypes.func.isRequired,
    leftConversation: PropTypes.func.isRequired,
    userTyping: PropTypes.func.isRequired,

    submitRating: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentConversation: {},
    currentTicket: {},
    isFetchingReplies: false,
    isFindingAgent: false,
    replyMessages: [],
    conversationId: '',
    sendingMessages: [],
    // sendingMessageErrors: {},
  }

  componentDidMount = () => {
    const {
      fetchReplyMessages, currentConversation,
      setCurrentTicket, joinConversation,
    } = this.props;
    // eslint-disable-next-line no-underscore-dangle
    if (!_isEmpty(currentConversation)) {
      const { ticketId, _id } = currentConversation;
      joinConversation(_id);
      fetchReplyMessages(_id);
      setCurrentTicket(ticketId);
    }
  }

  componentDidUpdate = (prevProps) => {
    this.scrollChatToBottom();
    const {
      currentConversation, setCurrentTicket, joinConversation, leftConversation,
    } = this.props;
    if (!_isEmpty(currentConversation)) {
      const { _id } = currentConversation;
      const { ticketId: prevTicketId, _id: prevConversationId } = prevProps.currentConversation;
      const { ticketId } = currentConversation;
      if (ticketId !== prevTicketId) {
        setCurrentTicket(ticketId);
      }
      if (_id !== prevConversationId) {
        joinConversation(_id);
        if (prevConversationId) {
          leftConversation(prevConversationId);
        }
      }
    }
  }

  renderOtherUserMessageContent = (msgId, contents) => (
    <MessageBoxItem left key={msgId}>
      <Avatar icon="user" size={35} />
      <MessageText>
        {contents.map(({ _id, messages }) => (<p key={_id}>{messages}</p>))}
      </MessageText>
    </MessageBoxItem>
  )

  renderOtherUserTypingContent = () => {
    const { otherUserTyping, conversationId } = this.props;
    const { conversationId: _id, messages = '' } = otherUserTyping || {};
    if (!_isEmpty(otherUserTyping)
      && _id === conversationId
      && !_isEmpty(messages.trim())
    ) {
      return (
        <MessageBoxItemIsTyping left key={_id}>
          <Avatar icon="user" size={35} />
          <MessageText>
            <p>{messages.trim()}</p>
            <IsTypingWrapper />
          </MessageText>
        </MessageBoxItemIsTyping>
      );
    }
    return false;
  }

  renderUserMessageContent = (msgId, contents, isPending = false) => (
    <MessageBoxItem right key={msgId}>
      <MessageText>
        {contents.map(({ _id, messages }) => (<UserMessage key={_id} pending={isPending}>{messages}</UserMessage>))}
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderSystemMessage = () => {
    const { systemMessage, currentConversation } = this.props;
    const { _id } = currentConversation;
    return shouldShowSystemMessage(systemMessage, _id) && (
      <MessageBoxSystemNotification>
        {systemMessage.message}
      </MessageBoxSystemNotification>
    );
  }

  renderMessageContent = () => {
    const {
      replyMessages, userId, systemMessage,
    } = this.props;
    const refinedMessages = combineChat(
      insertSystemMessageToRepliesChat(replyMessages, systemMessage)
    );
    return [refinedMessages.map(({
      from, _id: msgId, contents, isSystemMessage,
    }) => {
      if (isSystemMessage) {
        return this.renderSystemMessage();
      }
      if (from === userId) {
        return this.renderUserMessageContent(msgId, contents);
      }
      return this.renderOtherUserMessageContent(msgId, contents);
    }),
    this.renderOtherUserTypingContent(),
    ];
  }

  renderPendingMessageContent = () => {
    const { sendingMessages } = this.props;
    if (!sendingMessages || !sendingMessages.length) return null;

    return combineChat(sendingMessages).map(({ id: msgId, contents }) => this.renderUserMessageContent(msgId, contents, true));
  }

  renderGroupAction = () => (
    <MessageActionWrapper>
      <InputAction className="mia-gallery" htmlFor="file-upload" />
      <InputAction className="mia-folder" htmlFor="file-upload" />
      <InputAction className="mia-camera" />
      <InputAction className="mia-happiness" />
      {/* <InputUpload type="file" id="file-upload" /> */}
    </MessageActionWrapper>
  );

  handleChatSubmit = (values) => {
    const {
      sendReplyMessage, conversationId, userTyping, userRole,
    } = this.props;
    const { content } = values;
    const trimmedContent = content.trim();
    if (trimmedContent) {
      sendReplyMessage(conversationId, trimmedContent);
      if (!isAgent(userRole)) {
        userTyping(conversationId, '');
      }
      this.formik.getFormikContext().resetForm();
    }
  }

  handleFindAgent = () => {
    const { findAgentRequest, conversationId } = this.props;

    findAgentRequest(conversationId);
  }

  handleTyping = (e) => {
    const { userTyping, conversationId, userRole } = this.props;
    if (!isAgent(userRole)) {
      const { value } = e.target;
      userTyping(conversationId, value);
    }
  }

  renderMessageInput = () => {
    const { isFindingAgent, userRole } = this.props;
    return (
      <Formik
        ref={(formik) => { this.formik = formik; }}
        initialValues={initialValues}
        onSubmit={this.handleChatSubmit}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            onChange={this.handleChangeValues}
          >
            <MessageInputWrapper>
              <MessageInput
                onChange={this.handleTyping}
                type="text"
                name="content"
                placeholder="Type message ..."
                autoComplete="off"
              />
              {this.renderGroupAction()}
              <InputAction onClick={handleSubmit} className="mia-enter" />
              {(userRole !== ROLES.FREELANCER && userRole !== ROLES.FULLTIME)
                && (
                  <Button
                    loading={isFindingAgent}
                    key="button"
                    type="primary"
                    onClick={this.handleFindAgent}
                  >
                    Find Agent
                  </Button>
                )}
            </MessageInputWrapper>
          </Form>
        )}
      </Formik>
    );
  }

  renderMessageHeader = () => {
    const { currentTicket } = this.props;
    const { assignee = {}, title, status } = currentTicket || {};
    const { firstName = '', lastName = '' } = assignee;
    return (
      <MessageBoxHeaderWrapper>
        <Breadcrumb separator="-">
          <Breadcrumb.Item>
            <TicketStatus status={status} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {title}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{`${firstName} ${lastName}`}</Breadcrumb.Item>
        </Breadcrumb>
      </MessageBoxHeaderWrapper>
    );
  }

  scrollChatToBottom() {
    const { current } = this.messagesEndRef;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleSubmitRating = (values) => {
    const { submitRating, currentConversation } = this.props;
    const { _id } = currentConversation;
    submitRating(_id, values);
  }

  renderRating = () => {
    const { currentConversation } = this.props;
    const { rating } = currentConversation;
    return (
      <RatingWrapper>
        <RatingContent>
          <h2>Rate your experience</h2>
          <Formik
            ref={(formik) => { this.ratingFormik = formik; }}
            initialValues={rating}
            onSubmit={this.handleSubmitRating}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                onChange={this.handleChangeValues}
              >
                <FormInput type="rate" name="score" />
                <CommentInputWrapper>
                  <MessageInput type="text" name="comment" placeholder="Type comment ..." autoComplete="off" />
                  <InputAction onClick={handleSubmit} className="mia-enter" />
                </CommentInputWrapper>
              </Form>
            )}
          </Formik>
        </RatingContent>
      </RatingWrapper>
    );
  }


  render() {
    const {
      isFetchingReplies, isFindingAgent, otherUserTyping,
      replyMessages, currentTicket, systemMessage,
      currentConversation,
    } = this.props;
    const { _id } = currentConversation;
    const { status } = currentTicket || {};
    const hasChatData = !_isEmpty(replyMessages)
      || shouldShowSystemMessage(systemMessage, _id)
      || !_isEmpty(otherUserTyping);
    return (
      <LoadingSpin loading={isFetchingReplies || isFindingAgent}>
        {this.renderMessageHeader()}
        <MessageBoxWrapper>
          <MessageBoxContent>
            {status === TICKET_STATUS.CLOSED ? this.renderRating()
              : (
                <>
                  <ShadowScrollbars
                    autoHide
                    style={scrollStyle}
                  >
                    {!hasChatData
                      ? <MessageEmpty>No Chat Data</MessageEmpty>
                      : this.renderMessageContent()
                    }
                    {this.renderPendingMessageContent()}
                    <div ref={this.messagesEndRef} />
                  </ShadowScrollbars>
                  {this.renderMessageInput()}
                </>
              )}
          </MessageBoxContent>
          <ConversationDetail ticket={currentTicket} />
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
