import { REPLY_TYPE } from '../../../common/enums';

export const combineChat = (replyMessages = []) => {
  const combined = [];
  replyMessages.forEach((message) => {
    const {
      _id, from, type, params,
      messages, sentAt,
    } = message;
    if (type === REPLY_TYPE.TICKET_STATUS || type === REPLY_TYPE.USER_ACTION) {
      combined.push({
        _id: combined.length, type, from, params, sentAt,
      });
      return;
    }
    if (combined.length > 0) {
      const lastCombined = combined[combined.length - 1];
      const { from: last, contents } = lastCombined;
      if (last === from) {
        combined[combined.length - 1] = {
          ...lastCombined,
          contents: contents.concat({ _id, messages, sentAt }),
        };
      } else {
        combined.push({
          _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
        });
      }
    } else {
      combined.push({
        _id: combined.length, type, from, contents: [{ _id, messages, sentAt }],
      });
    }
  });
  return combined;
};
