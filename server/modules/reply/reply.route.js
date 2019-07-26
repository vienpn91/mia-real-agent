import { Router } from 'express';
import ReplyController from './reply.controller';

class ReplyRouter {
  constructor(controller) {
    this.router = Router();

    this.router.post('/', controller.insertReply);
  }
}

export default new ReplyRouter(ReplyController);
