import BaseRouter from '../base/base.route';
import ChatLogController from './chatlog.controller';

class ChatLogRouter extends BaseRouter {
  constructor() {
    super(ChatLogController);
    this.router.post(
      '/:id',
      ChatLogController.insertMessage,
    );
    this.router.get(
      '/find/ticketAndAgent',
      ChatLogController.getChatByTicketAndAgent,
    );
  }
}

export default new ChatLogRouter();
