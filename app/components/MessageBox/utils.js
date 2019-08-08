import _isEmpty from 'lodash/isEmpty';
import { compareDate } from '../../utils/func-utils';

export const insertSystemMessageToRepliesChat = (replyMessages, systemMessage) => {
  const { message = '' } = systemMessage || {};
  if (_isEmpty(systemMessage)
    || _isEmpty(message.trim())) {
    return replyMessages;
  }
  const { sentAt } = systemMessage;
  let index = replyMessages
    .findIndex(({ sentAt: replySentAt }) => compareDate(new Date(replySentAt), sentAt) > 0);
  if (index < 0) {
    index = replyMessages.length;
  }
  return [...replyMessages.slice(0, index), { isSystemMessage: true }, ...replyMessages.splice(index)];
};

export const combineChat = (replyMessages = []) => {
  const combined = [];
  replyMessages.forEach((message) => {
    const {
      _id, from,
      messages, sentAt, isSystemMessage,
    } = message;
    if (combined.length > 0) {
      if (isSystemMessage) {
        combined.push({ isSystemMessage: true });
      } else {
        const lastCombined = combined[combined.length - 1];
        const { from: last, contents } = lastCombined;
        if (last === from) {
          combined[combined.length - 1] = {
            ...lastCombined,
            contents: contents.concat({ _id, messages, sentAt }),
          };
        } else {
          combined.push({ _id: combined.length, from, contents: [{ _id, messages, sentAt }] });
        }
      }
    } else if (isSystemMessage) {
      combined.push({ _id: combined.length, isSystemMessage: true });
    } else if (from && messages) {
      combined.push({ _id: combined.length, from, contents: [{ _id, messages, sentAt }] });
    }
  });
  return combined;
};
