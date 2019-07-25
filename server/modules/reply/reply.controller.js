import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import ReplyService from './reply.service';

class ReplyController extends BaseController {
  constructor() {
    super(ReplyService);
    this.insertReply = this.insertReply.bind(this);
  }

  async insertReply(req, res) {
    try {
      const data = req.body;
      const { model } = req;
      const ticket = await ReplyService.insertReply(model, data);
      return res.status(httpStatus.OK).send({ ticket });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ReplyController();
