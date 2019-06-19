import React, { Component } from 'react';
import { Avatar } from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import {
  MessageBoxWrapper,
  MessageBoxContent,
  MessageBoxItem,
  MessageText,
  MessageInputWrapper,
  MessageActionWrapper,
  MessageInput,
  InputAction,
  InputUpload,
} from './styles';

const scrollStyle = {
  height: 'calc(100% - 60px)',
  width: '100%',
};

export default class MessageBox extends Component {
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

  renderRightMessageContent = () => (
    <MessageBoxItem right>
      <MessageText>
        <p>Whats your name ?</p>
        <p>
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
        </p>
      </MessageText>
      <Avatar icon="user" size={35} />
    </MessageBoxItem>
  )

  renderGroupAction = () => (
    <MessageActionWrapper>
      <InputAction className="mia-gallery" htmlFor="file-upload" />
      <InputAction className="mia-folder" htmlFor="file-upload" />
      <InputAction className="mia-camera" />
      <InputAction className="mia-happiness" />
      <InputUpload type="file" id="file-upload" />
    </MessageActionWrapper>
  );

  renderMessageInput = () => (
    <MessageInputWrapper>
      <MessageInput type="text" placeholder="Type message ..." />
      {this.renderGroupAction()}
    </MessageInputWrapper>
  );

  render() {
    return (
      <MessageBoxWrapper>
        <MessageBoxContent>
          <ShadowScrollbars autoHide style={scrollStyle}>
            {this.renderLeftMessageContent()}
            {this.renderRightMessageContent()}
            {this.renderLeftMessageContent()}
            {this.renderRightMessageContent()}
          </ShadowScrollbars>
        </MessageBoxContent>
        {this.renderMessageInput()}
      </MessageBoxWrapper>
    );
  }
}
