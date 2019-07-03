import express from 'express';
/* routers */
import UserRouter from './user/user.route';
import AuthRouter from './auth/auth.route';
import WitAIRouter from './witai/witai.route';
import ConversationRouter from './conversation/conversation.route';
import TicketRouter from './ticket/ticket.route';
import ChatLogRouter from './chatlog/chatlog.route';
import ApplicationRouter from './application/application.route';

const router = express.Router();

export default () => {
  router.use('/users', UserRouter.router);
  router.use('/auth', AuthRouter.router);
  router.use('/witai', WitAIRouter.router);
  router.use('/chats', ChatLogRouter.router);
  router.use('/conversations', ConversationRouter.router);
  router.use('/tickets', TicketRouter.router);
  router.use('/applications', ApplicationRouter.router);
  return router;
};
