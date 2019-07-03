import React, { Component } from 'react';
import {
  Avatar, Breadcrumb,
  Button, Form,
} from 'antd';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
import {
  object, func, shape,
  bool, string,
} from 'prop-types';
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
  InputUpload,
} from '../styles';
import LoadingSpin from '../../Loading';

const scrollStyle = {
  height: 'calc(100% - 60px)',
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
    const { assignee } = ticket;
    if (assignee) {
      getChat(assignee);
    }
  }

  componentDidUpdate = (prevProps) => {
    this.scrollChatToBottom();
    const { chatData } = this.props;
    if (prevProps.chatData !== chatData) {
      const { pendingMessages } = this.state;
      const updatePendingMessage = pendingMessages.filter(
        ({ timestamp }) => !chatData.messages.find(
          (message) => {
            const { timestamp: msgTimestamp } = message;
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

  renderLeftMessageContent = (_id, content) => (
    <MessageBoxItem left key={_id}>
      <Avatar icon="user" size={35} />
      <MessageText>
        <p>{content}</p>
      </MessageText>
    </MessageBoxItem>
  )

  renderRightMessageContent = (_id, content, isPending) => (
    <MessageBoxItem right key={_id}>
      <MessageText isPending={isPending}>
        <p>{content}</p>
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderMessageContent = () => {
    const { chatData, userId } = this.props;
    const { pendingMessages } = this.state;
    const { messages } = chatData;
    return [messages.map(({ _id, messageOwner, content }) => {
      if (messageOwner === userId) {
        return this.renderRightMessageContent(_id, content);
      }
      return this.renderLeftMessageContent(_id, content);
    }),
    pendingMessages.map(({ content }, index) => this.renderRightMessageContent(index, content, true)),
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
    const msg = {
      messageOwner: userId,
      content,
      timestamp: new Date(),
    };
    const { pendingMessages } = this.state;
    this.setState({
      pendingMessages: pendingMessages.concat(msg),
    });
    sendMessage(msg);
    this.formik.getFormikContext().resetForm();
  }

  handleFindAgent = () => {
    const { ticket, findAgent } = this.props;
    const { _id } = ticket;
    findAgent(_id);
  }

  renderMessageInput = () => {
    const { isFindingAgent } = this.props;
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
    return (
      <MessageBoxHeaderWrapper>
        <Breadcrumb separator="-">
          <Breadcrumb.Item>{ticket.title}</Breadcrumb.Item>
          <Breadcrumb.Item>{ticket.assignee}</Breadcrumb.Item>
        </Breadcrumb>
      </MessageBoxHeaderWrapper>
    );
  }

  scrollChatToBottom() {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { isGetting, chatData } = this.props;
    return (
      <LoadingSpin loading={isGetting}>
        <MessageBoxWrapper>
          {this.renderMessageHeader()}
          <MessageBoxContent>
            <ShadowScrollbars
              autoHide
              style={scrollStyle}
            >
              { !chatData
                ? <MessageEmpty>No Message</MessageEmpty>
                : (
                  <React.Fragment>
                    {this.renderLeftMessageContent()}
                    {this.renderMessageContent()}
                  </React.Fragment>
                )
              }
              <div ref={this.messagesEndRef} />
            </ShadowScrollbars>
          </MessageBoxContent>
          {this.renderMessageInput()}
        </MessageBoxWrapper>
      </LoadingSpin>
    );
  }
}
