import passport from 'passport';
import BaseRouter from '../base/base.route';
import ChatLogController from './chatlog.controller';

class ChatLogRouter extends BaseRouter {
  constructor() {
    super(ChatLogController);
    this.router.post(
      '/:id',
      passport.authenticate('jwt', { session: false }),
      ChatLogController.insertMessage,
    );
    this.router.get(
      '/find/ticketAndAgent',
      passport.authenticate('jwt', { session: false }),
      ChatLogController.getChatByTicketAndAgent,
    );
  }
}

export default new ChatLogRouter();
