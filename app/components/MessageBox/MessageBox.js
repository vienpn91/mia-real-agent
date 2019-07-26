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
} from './styles';
import LoadingSpin from '../Loading';

const scrollStyle = {
  height: '100%',
  width: '100%',
};

const initialValues = {
  content: '',
};

export default class MessageBox extends Component {
  messagesEndRef = React.createRef();

  static propTypes = {
    ticket: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    conversationId: PropTypes.string,
    fetchReplyMessages: PropTypes.func.isRequired,
    currentConversation: PropTypes.object,
    isFetchingReplies: PropTypes.bool,
    replyMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessages: PropTypes.arrayOf(PropTypes.shape()),
    sendingMessageErrors: PropTypes.objectOf(PropTypes.any),
    sendReplyMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentConversation: {},
    isFetchingReplies: false,
    replyMessages: [],
    conversationId: '',
    sendingMessages: [],
    sendingMessageErrors: {},
  }

  componentDidMount = () => {
    const { fetchReplyMessages, currentConversation } = this.props;
    // eslint-disable-next-line no-underscore-dangle
    fetchReplyMessages(currentConversation._id);
  }

  componentDidUpdate = (prevProps) => {
    return;
    this.scrollChatToBottom();
    const {
      replyMessages, getChat, ticket, userId,
    } = this.props;
    const { ticket: prevTicket } = prevProps;
    const { _id, assignee } = ticket;
    const { _id: prevId } = prevTicket;
    if (ticket !== null && _id !== prevId && assignee) {
      getChat(_id, assignee);
    }
    if (replyMessages && prevProps.replyMessages !== replyMessages) {
      const { pendingMessages } = this.state;
      const { messages } = replyMessages;
      const last = messages[messages.length - 1];
      if (!last) {

      }
      const { messageOwner, contents } = last;
      if (messageOwner === userId && !_isEmpty(pendingMessages)) {
        const updatePendingMessage = pendingMessages.filter(
          ({ timestamp }) => !contents.find(
            ({ timestamp: msgTimestamp }) => {
              if (!msgTimestamp) {
                return false;
              }
              return new Date(msgTimestamp).getTime()
                === new Date(timestamp).getTime();
            }
          )
        );
        this.setState({
          pendingMessages: updatePendingMessage,
        });
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

  renderMessageInput = () => (
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
            <MessageInput type="text" name="content" placeholder="Type message ..." />
            {this.renderGroupAction()}
            <InputAction onClick={handleSubmit} className="mia-enter" />
            <Button
              loading={false}
              key="button"
              type="primary"
              onClick={this.handleFindAgent}
            >
                Find Agent
            </Button>
          </MessageInputWrapper>
        </Form>
      )}
    </Formik>
  )

  renderMessageHeader = () => {
    const { ticket } = this.props;
    const { assignee = {} } = ticket;
    const { firstName = '', lastName = '' } = assignee;
    return (
      <MessageBoxHeaderWrapper>
        <Breadcrumb separator="-">
          <Breadcrumb.Item>{ticket.title}</Breadcrumb.Item>
          <Breadcrumb.Item>{`${firstName} ${lastName}`}</Breadcrumb.Item>
        </Breadcrumb>
      </MessageBoxHeaderWrapper>
    );
  }

  scrollChatToBottom() {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { isFetchingReplies, replyMessages } = this.props;

    return (
      <LoadingSpin loading={isFetchingReplies}>
        {this.renderMessageHeader()}
        <MessageBoxWrapper>
          <MessageBoxContent>
            <ShadowScrollbars
              autoHide
              style={scrollStyle}
            >
              {!replyMessages || !replyMessages.length
                ? <MessageEmpty>No Chat Data</MessageEmpty>
                : this.renderMessageContent()
              }
              {this.renderPendingMessageContent()}
              {this.renderMessageInput()}
              <div ref={this.messagesEndRef} />
            </ShadowScrollbars>
          </MessageBoxContent>
          {/* <ConversationDetail conversation={ticket} /> */}
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
