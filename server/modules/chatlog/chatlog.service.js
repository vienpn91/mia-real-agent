import _ from 'lodash';
import chatLogCollection from './chatlog.model';
import BaseService from '../base/base.service';

class ChatLogService extends BaseService {
  constructor() {
    super(chatLogCollection);
  }

  async insertMessage(model, msg) {
    const { messages } = model;
    _.assign(model, { messages: messages.concat(msg) });
    const saved = await model.save();
    return saved;
  }

  getByTicketAndAgent(ticketId, agentId) {
    const chat = this.collection.findOne({
      ticketId,
      to: agentId,
    }).exec();
    return chat;
  }
}

export default new ChatLogService();
