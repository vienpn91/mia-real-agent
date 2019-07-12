import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import ChatLogService from './chatlog.service';

class ChatLogController extends BaseController {
  constructor() {
    super(ChatLogService);
  }

  async getChatByTicketAndAgent(req, res) {
    try {
      const { ticketId, agentId } = req.query;
      const chat = await ChatLogService.getByTicketAndAgent(ticketId, agentId);
      return res.status(httpStatus.OK).send(chat);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async insertMessage(req, res) {
    try {
      const data = req.body;
      const { model } = req;
      const ticket = await ChatLogService.insertMessage(model, data);
      return res.status(httpStatus.OK).send({ ticket });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ChatLogController();
