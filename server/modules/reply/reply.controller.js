import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import ReplyService from './reply.service';
import { emitNewMessage } from '../chat/chat.socket';

class ReplyController extends BaseController {
  constructor() {
    super(ReplyService);
    this.insertReply = this.insertReply.bind(this);
  }

  async insertReply(req, res) {
    try {
      const reply = req.body;
      const newReply = await this.service.insert(reply);
      emitNewMessage(reply);
      return res.status(httpStatus.OK).send({ reply: newReply });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ReplyController();
