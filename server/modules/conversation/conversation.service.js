import conversationCollection from './conversation.model';
import BaseService from '../base/base.service';

class ConversationService extends BaseService {
  constructor() {
    super(conversationCollection);
  }

  countDocument(filter) {
    return this.collection.countDocuments(filter);
  }
}

export default new ConversationService();
