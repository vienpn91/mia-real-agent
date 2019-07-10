import httpStatus from 'http-status';
import mongoose from 'mongoose';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import TicketService from '../ticket/ticket.service';
import ChatlogService from '../chatlog/chatlog.service';
import UserService from '../user/user.service';
import AgentQueue from '../queue/agentQueue';
import { authenticateSocketIO } from '../../middlewares/authenticateMiddlewares';
import Logger from '../../logger';

class AgentController {
  constructor() {
    this.findAgent = this.findAgent.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.handleError = this.handleError.bind(this);
    this.load = this.load.bind(this);
  }

  async load(req, res, next, id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const { CONTENT_NOT_FOUND } = ERROR_MESSAGE;
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.BAD_REQUEST);
      }
      const model = await UserService.get(id);

      if (model == null) {
        const { CONTENT_NOT_FOUND } = ERROR_MESSAGE;
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.NOT_FOUND);
      }

      req.model = model;
      return next();
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  handleError(res, error) {
    Logger.error(error.message);
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(status).send(error.message);
  }

  async findAgent(req, res) {
    try {
      const { ticketId } = req.body;
      const ticket = await TicketService.get(ticketId);
      const { categories: ticketCategories } = ticket;
      // Get owner information
      const queue = AgentQueue.get();
      let agents = queue.filter(
        ({ categories }) => {
          if (!categories) {
            return false;
          }
          return categories
            .some(category => ticketCategories.includes(category));
        }
      );
      if (agents.length === 0) {
        agents = queue;
      }
      const agent = agents[Math.floor(Math.random() * agents.length)];
      if (agent) {
        const { socketId } = agent;
        const { socketIO } = global.socketIOServer;
        const { connected } = socketIO.sockets;
        const socket = connected[socketId];
        // Emit ticket infomation to agent
        if (socket) {
          const { _doc } = ticket;
          socket.emit('REQUEST_AVAILABLE', _doc);
        }
      }
      return res.status(httpStatus.OK).send({ agent });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async acceptRequest(req, res) {
    try {
      const { model } = req;
      const { ticketId, isConfirm } = req.body;
      const ticket = await TicketService.get(ticketId);
      const { owner } = ticket;
      const { _id } = model;
      if (isConfirm) {
        AgentQueue.remove(_id);
        // Update asignnee for ticket
        TicketService.update(ticketId,
          { assignee: _id });
        // Create chat here
        ChatlogService.insert({
          ticketId,
          from: owner,
          to: _id,
        });
      }
      const { socketIO } = global.socketIOServer;
      const { connected } = socketIO.sockets;
      const sockets = Object.keys(connected).map(i => connected[i]);
      sockets.forEach(
        async (socket) => {
          const { data: user } = await authenticateSocketIO(socket);
          const { _id: userId } = user;
          if (userId.toString() === owner.toString()) {
            const { _doc } = ticket;
            socket.emit('REQUEST_CONFIRM', { ticketId: _doc.ticketId, isConfirm });
          }
        }
      );
      return res.status(httpStatus.OK).send({ agentId: _id });
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AgentController();
