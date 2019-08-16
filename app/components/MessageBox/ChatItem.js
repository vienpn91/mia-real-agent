import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import {
  MessageBoxItem, MessageText,
  UserMessage, ProfileImageStyled,
  MessageBoxSystemNotification, LineDivider, MessageBoxItemIsTyping, IsTypingWrapper,
} from './styles';

const renderTime = time => moment(time).format('hh:mm');


export const userChat = (msgId, contents, isPending = false) => (
  <MessageBoxItem right key={msgId}>
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="right" title={renderTime(sentAt)}>
          <UserMessage key={_id} pending={isPending}>
            {messages}
          </UserMessage>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const otherChat = (msgId, contents, avatar) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src={avatar}
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="left" title={renderTime(sentAt)}>
          <p key={_id}>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const botChat = (msgId, contents) => (
  <MessageBoxItem left key={msgId}>
    <ProfileImageStyled
      src="/assets/images/mia-avatar.jpg"
    />
    <MessageText>
      {contents.map(({ _id, messages, sentAt }) => (
        <Tooltip placement="left" title={renderTime(sentAt)}>
          <p key={_id}>
            {messages}
          </p>
        </Tooltip>
      ))}
    </MessageText>
  </MessageBoxItem>
);

export const otherTyping = messages => (
  <MessageBoxItemIsTyping left key="UserTyping">
    <ProfileImageStyled
      src="/assets/images/user-live.jpeg"
    />
    <MessageText>
      <p>{messages.trim()}</p>
      <IsTypingWrapper />
    </MessageText>
  </MessageBoxItemIsTyping>
);

export const ticketStatus = (msgId, params, sentAt) => {
  const { status } = params;
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {`Ticket change to ${status}`}
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};

export const userAction = (msgId, params, sentAt) => {
  const { action } = params;
  return (
    <MessageBoxSystemNotification key={`status${msgId}`}>
      <LineDivider />
      <Tooltip placement="top" title={renderTime(sentAt)}>
        {`User has ${action}`}
      </Tooltip>
      <LineDivider />
    </MessageBoxSystemNotification>
  );
};
