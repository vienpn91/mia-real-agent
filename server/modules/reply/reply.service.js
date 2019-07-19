import _ from 'lodash';
import ReplyCollection from './reply.model';
import BaseService from '../base/base.service';

class ReplyService extends BaseService {
  constructor() {
    super(ReplyCollection);
  }

  async insertReply(model, msg) {
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

export default new ReplyService();
