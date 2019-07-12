import React, { Component } from 'react';
import {
  Avatar, Breadcrumb,
  Button, Form,
} from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
import {
  object, func, shape,
  bool, string,
} from 'prop-types';
import TicketDetail from '../TicketDetail/TicketDetail';
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
} from '../Chatbot.styled';
import LoadingSpin from '../../Loading';
import { InfoNotification } from './styles';

const scrollStyle = {
  height: '100%',
  width: '100%',
};

const initialValues = {
  content: '',
};

export default class MessageBox extends Component {
  messagesEndRef = React.createRef();

  state = {
    pendingMessages: [],
  }

  static propTypes = {
    isGetting: bool.isRequired,
    isFindingAgent: bool.isRequired,
    ticket: object.isRequired,
    chatData: shape(),
    sendMessage: func.isRequired,
    findAgent: func.isRequired,
    getChat: func.isRequired,
    userId: string.isRequired,
  }

  static defaultProps = {
    chatData: null,
  }

  componentDidMount = () => {
    const { getChat, ticket } = this.props;
    const { _id, assignee } = ticket;
    if (assignee) {
      getChat(_id, assignee);
    }
  }

  componentDidUpdate = (prevProps) => {
    this.scrollChatToBottom();
    const {
      chatData, getChat, ticket, userId,
    } = this.props;
    const { ticket: prevTicket } = prevProps;
    const { _id, assignee } = ticket;
    const { _id: prevId } = prevTicket;
    if (ticket !== null && _id !== prevId && assignee) {
      getChat(_id, assignee);
    }
    if (chatData && prevProps.chatData !== chatData) {
      const { pendingMessages } = this.state;
      const { messages } = chatData;
      const last = messages[messages.length - 1];
      if (!last) {
        return;
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
    const { chatData, userId, ticket } = this.props;
    const { assignee } = ticket;
    if (!assignee) {
      return (<InfoNotification>Please find Agent</InfoNotification>);
    }
    const { pendingMessages } = this.state;
    const { messages: originMessages } = chatData;
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
    const { sendMessage, userId } = this.props;
    const { content } = values;
    const { pendingMessages } = this.state;
    if (content.trim()) {
      const msg = {
        messageOwner: userId,
        content: content.trim(),
        timestamp: new Date(),
        isPending: true,
      };
      this.setState({
        pendingMessages: pendingMessages.concat({
          ...msg,
          _id: pendingMessages.length,
        }),
      });
      sendMessage(msg);
      this.formik.getFormikContext().resetForm();
    }
  }

  handleFindAgent = () => {
    const { ticket, findAgent } = this.props;
    const { _id } = ticket;
    findAgent(_id);
  }

  renderMessageInput = () => {
    const { isFindingAgent, ticket } = this.props;
    const { assignee } = ticket;
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
              <MessageInput type="text" name="content" placeholder="Type message ..." />
              {this.renderGroupAction()}
              <InputAction onClick={handleSubmit} className="mia-enter" />
              <Button
                // disabled={assignee}
                loading={isFindingAgent}
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
    );
  }

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
    const { isGetting, chatData, ticket } = this.props;
    return (
      <LoadingSpin loading={isGetting}>
        {this.renderMessageHeader()}
        <MessageBoxWrapper>
          <MessageBoxContent>
            <ShadowScrollbars
              autoHide
              style={scrollStyle}
            >
              <React.Fragment>
                {!chatData
                  ? <MessageEmpty>No Chat Data</MessageEmpty>
                  : this.renderMessageContent()
                }
                {this.renderMessageInput()}
              </React.Fragment>
              <div ref={this.messagesEndRef} />
            </ShadowScrollbars>
          </MessageBoxContent>
          <TicketDetail ticket={ticket} />
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
