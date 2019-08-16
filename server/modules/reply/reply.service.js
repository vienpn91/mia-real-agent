import _ from 'lodash';
import ReplyCollection from './reply.model';
import BaseService from '../base/base.service';
import { REPLY_TYPE } from '../../../common/enums';

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

  async logUserAction(conversationId, userId, action) {
    const reply = {
      type: REPLY_TYPE.USER_ACTION,
      conversationId,
      from: userId,
      messages: 'User Action', // miaReply.message
      params: {
        action,
      },
    };
    this.insert(reply);
  }
}

export default new ReplyService();
