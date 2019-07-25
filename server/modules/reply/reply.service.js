import _ from 'lodash';
import ReplyCollection from './reply.model';
import BaseService from '../base/base.service';

class ReplyService extends BaseService {
  constructor() {
    super(ReplyCollection);
  }

  getByConversation(conversationId) {
    const replies = this.collection.find({
      conversationId,
    }).exec();
    return replies;
  }
}

export default new ReplyService();
