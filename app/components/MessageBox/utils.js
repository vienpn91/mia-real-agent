import _isEmpty from 'lodash/isEmpty';
import { compareDate } from '../../utils/func-utils';

export const insertSystemMessageToRepliesChat = (replyMessages, systemMessage) => {
  if (_isEmpty(systemMessage)) {
    return replyMessages;
  }
  const { sentAt } = systemMessage;
  let index = replyMessages
    .findIndex(({ sentAt: replySentAt }) => compareDate(new Date(replySentAt), sentAt));
  if (index < 0) {
    index = replyMessages.length - 1;
  }
  return [...replyMessages.slice(0, index), { isSystemMessage: true }, ...replyMessages.splice(index)];
};
