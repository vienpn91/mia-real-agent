import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import ChatLogService from './chatlog.service';
import { authenticateSocketIO } from '../../middlewares/authenticateMiddlewares';

class ChatLogController extends BaseController {
  constructor() {
    super(ChatLogService);
  }

  async insertMessage(req, res) {
    try {
      const data = req.body;
      const { model } = req;
      const ticket = await ChatLogService.insertMessage(model, data);
      const { socketIO } = global.socketIOServer;
      const { from, to } = model;
      const { connected } = socketIO.sockets;
      const sockets = Object.keys(connected).map(i => connected[i]);
      sockets.forEach(
        async (socket) => {
          const { data: user } = await authenticateSocketIO(socket);
          const { _id } = user;
          if (_id.toString() === from.toString()
            || _id.toString() === to.toString()) {
            socket.emit('UPDATE_CHAT', 'reset');
          }
        }
      );
      return res.status(httpStatus.OK).send({ ticket });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ChatLogController();
