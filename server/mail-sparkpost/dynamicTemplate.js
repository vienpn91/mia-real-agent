
import moment from 'moment';
import { REPLY_TYPE } from '../../common/enums';

export const conversationTranscript = (messages) => {
  const textMessages = messages.map((message) => {
    let text = '';
    const {
      type, params, sentAt, from: ownerMessage, messages: messageText,
    } = message;
    switch (type) {
      case REPLY_TYPE.TICKET_STATUS: {
        text = `
          <div style="padding: 10px 0px;">
            Ticket changed to <b>${params.status}</b> • ${moment(sentAt).format('MM/DD/YYYY hh:mm A')}
          </div>
        `;
        break;
      }
      case REPLY_TYPE.USER_ACTION: {
        let messageOwner = '';
        if (!ownerMessage) return '';
        const { profile } = ownerMessage;
        const { firstName, lastName } = profile;

        messageOwner = `${firstName} ${lastName}`;

        text = `
          <div style="padding: 10px 0px;">
            <b>${messageOwner}</b> is <b>${params.action}</b> • ${moment(sentAt).format('MM/DD/YYYY hh:mm A')}
          </div>
        `;
        break;
      }
      case REPLY_TYPE.BOT_RESPONSE: {
        text = `
          <div style="padding: 10px 0px;">
            <div><b>Bot Mia</b> send a message • ${moment(sentAt).format('MM/DD/YYYY hh:mm A')}</div>
            <div>${messageText}</div>
          </div>
        `;
        break;
      }

      case REPLY_TYPE.USER_NORMAL: {
        let messageOwner = '';
        if (!ownerMessage) return '';
        const { profile } = ownerMessage;
        const { firstName, lastName } = profile;

        messageOwner = `${firstName} ${lastName}`;

        text = `
          <div style="padding: 10px 0px;">
            <div><b>${messageOwner}</b> send a message • ${moment(sentAt).format('MM/DD/YYYY hh:mm A')}</div>
            <div>${messageText}</div>
          </div>
        `;
        break;
      }
      default: break;
    }
    return text;
  }).join('');
  return textMessages;
};
