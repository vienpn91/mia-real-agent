import React, { Component } from 'react';
import {
  Avatar, Breadcrumb,
  Button, Form,
} from 'antd';
import { Formik } from 'formik';
import ShadowScrollbars from 'components/Scrollbar';
import { object, func, shape } from 'prop-types';
import {
  MessageBoxWrapper,
  MessageBoxContent,
  MessageBoxItem,
  MessageBoxHeaderWrapper,
  MessageText,
  MessageInputWrapper,
  MessageActionWrapper,
  MessageInput,
  InputAction,
  InputUpload,
} from '../styles';

const scrollStyle = {
  height: 'calc(100% - 60px)',
  width: '100%',
};

export default class MessageBox extends Component {
  static propTypes = {
    ticket: object.isRequired,
    chatData: shape(),
    sendMessage: func.isRequired,
    getChat: func.isRequired,
  }

  static defaultProps = {
    chatData: null,
  }

  componentDidMount = () => {
    const { getChat } = this.props;
    getChat();
  }

  renderLeftMessageContent = () => (
    <MessageBoxItem left>
      <Avatar icon="user" size={35} />
      <MessageText>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </MessageText>
    </MessageBoxItem>
  )

  renderRightMessageContent = message => (
    <MessageBoxItem right>
      <MessageText>
        <p>{message}</p>
        {/* <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p> */}
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderMessageContent = () => {
    const { chatData } = this.props;
    if (!chatData) {
      return (<h2>No data</h2>);
    }
    const { messages } = chatData;
    // TODO: Seperate chat here
    return messages.map(({ content }) => this.renderRightMessageContent(content));
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
    const { sendMessage } = this.props;
    const { content } = values;
    const msg = {
      messageOwner: '5d0c8b175cb62a15742eec17',
      content,
    };
    sendMessage(msg);
  }

  renderMessageInput = () => (
    <Formik
      ref={(formik) => { this.formik = formik; }}
      // validationSchema={validationSchema}
      // initialValues={initialValues}
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
            <Button key="submit" type="primary" onClick={handleSubmit}>Send</Button>
          </MessageInputWrapper>
        </Form>
      )}
    </Formik>
  );

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

  render() {
    return (
      <MessageBoxWrapper>
        {this.renderMessageHeader()}
        <MessageBoxContent>
          <ShadowScrollbars autoHide style={scrollStyle}>
            {this.renderMessageContent()}
          </ShadowScrollbars>
        </MessageBoxContent>
        {this.renderMessageInput()}
      </MessageBoxWrapper>
    );
  }
}
