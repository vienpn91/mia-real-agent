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
} from './styles';
import LoadingSpin from '../Loading';
import ConversationDetail from '../ConversationDetail/ConversationDetail';
import { TICKET_STATUS } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';

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
    fetchReplyMessages: PropTypes.func.isRequired,
    currentConversation: PropTypes.object,
    currentTicket: PropTypes.object,
    isFetchingReplies: PropTypes.bool,
    isFindingAgent: PropTypes.bool,
    replyMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessageErrors: PropTypes.objectOf(PropTypes.any),

    findAgentRequest: PropTypes.func.isRequired,
    sendReplyMessage: PropTypes.func.isRequired,
    setCurrentTicket: PropTypes.func.isRequired,
    joinConversation: PropTypes.func.isRequired,

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
    const { currentConversation, setCurrentTicket } = this.props;
    if (!_isEmpty(currentConversation)) {
      const { ticketId: prevTicketId } = prevProps.currentConversation;
      const { ticketId } = currentConversation;
      if (ticketId !== prevTicketId) {
        setCurrentTicket(ticketId);
      }
    }
  }

  renderOtherUserMessageContent = (msgId, message) => (
    <MessageBoxItem left key={msgId}>
      <Avatar icon="user" size={35} />
      <MessageText>
        <p>{message}</p>
      </MessageText>
    </MessageBoxItem>
  )

  renderUserMessageContent = (msgId, message, isPending = false) => (
    <MessageBoxItem right key={msgId}>
      <MessageText>
        <UserMessage pending={isPending}>{message}</UserMessage>
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderMessageContent = () => {
    const { replyMessages, userId } = this.props;
    if (!replyMessages || !replyMessages.length) {
      return (<MessageEmpty>No Message</MessageEmpty>);
    }

    return replyMessages.map(({ from, _id: msgId, messages }) => {
      if (from === userId) {
        return this.renderUserMessageContent(msgId, messages);
      }
      return this.renderOtherUserMessageContent(msgId, messages);
    });
  }

  renderPendingMessageContent = () => {
    const { sendingMessages } = this.props;
    if (!sendingMessages || !sendingMessages.length) return null;

    return sendingMessages.map(({ id: msgId, message }) => this.renderUserMessageContent(msgId, message, true));
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
    const { sendReplyMessage, conversationId } = this.props;
    const { content } = values;
    const trimmedContent = content.trim();
    if (trimmedContent) {
      sendReplyMessage(conversationId, trimmedContent);
      this.formik.getFormikContext().resetForm();
    }
  }

  handleFindAgent = () => {
    const { findAgentRequest, conversationId } = this.props;

    findAgentRequest(conversationId);
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
              <MessageInput type="text" name="content" placeholder="Type message ..." autoComplete="off" />
              {this.renderGroupAction()}
              <InputAction onClick={handleSubmit} className="mia-enter" />
              {userRole !== 'agent' && (
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
    const { assignee = {}, title } = currentTicket || {};
    const { firstName = '', lastName = '' } = assignee;
    return (
      <MessageBoxHeaderWrapper>
        <Breadcrumb separator="-">
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
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
    const { isFetchingReplies, replyMessages, currentTicket } = this.props;
    const { status } = currentTicket || {};
    return (
      <LoadingSpin loading={isFetchingReplies}>
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
                    {!replyMessages || !replyMessages.length
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
