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
    sendingMessages: PropTypes.objectOf(PropTypes.any),
    sendingMessageErrors: PropTypes.objectOf(PropTypes.any),
    sendReplyMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentConversation: {},
    isFetchingReplies: false,
    replyMessages: [],
    conversationId: '',
    sendingMessages: {},
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

  renderLeftMessageContent = (_id, contents) => (
    <MessageBoxItem left key={_id}>
      <Avatar icon="user" size={35} />
      <MessageText>
        {
          contents.map(
            ({ _id: messageId, content }) => (<p key={messageId}>{content}</p>)
          )
        }
      </MessageText>
    </MessageBoxItem>
  )

  renderRightMessageContent = (_id, contents) => (
    <MessageBoxItem right key={_id}>
      <MessageText>
        {
          contents.map(
            ({ _id: messageId, content, isPending }) => (
              <UserMessage pending={isPending} key={messageId}>{content}</UserMessage>
            )
          )
        }
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderMessageContent = () => {
    return;
    const { replyMessages, userId, ticket } = this.props;
    const { assignee } = ticket;
    if (!assignee) {
      return (<InfoNotification>Please find Agent</InfoNotification>);
    }
    const { pendingMessages } = this.state;
    const { messages: originMessages } = replyMessages;
    const messages = Object.assign([], originMessages);
    if (_isEmpty(messages)) {
      return (<MessageEmpty>No Message</MessageEmpty>);
    }
    // Apend pending Messages
    if (!_isEmpty(pendingMessages)) {
      const last = messages[messages.length - 1];
      const { messageOwner: lastOwner, contents: lastContents } = last;
      if (lastOwner === userId) {
        messages[messages.length - 1] = {
          ...last,
          contents: lastContents.concat(pendingMessages),
        };
      } else {
        messages.push({
          _id: messages.length,
          messageOwner: userId,
          contents: pendingMessages,
        });
      }
    }

    return [messages.map(({ _id, messageOwner, contents }) => {
      if (messageOwner === userId) {
        return this.renderRightMessageContent(_id, contents);
      }
      return this.renderLeftMessageContent(_id, contents);
    }),
    ];
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
              <React.Fragment>
                {!replyMessages || !replyMessages.length
                  ? <MessageEmpty>No Chat Data</MessageEmpty>
                  : this.renderMessageContent()
                }
                {this.renderMessageInput()}
              </React.Fragment>
              <div ref={this.messagesEndRef} />
            </ShadowScrollbars>
          </MessageBoxContent>
          {/* <ConversationDetail conversation={ticket} /> */}
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
