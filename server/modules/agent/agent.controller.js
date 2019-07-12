import httpStatus from 'http-status';
import TicketService from '../ticket/ticket.service';
import ChatlogService from '../chatlog/chatlog.service';
import ConversationService from '../conversation/conversation.service';
import AgentQueue from '../queue/agentQueue';
import UserQueue from '../queue/userQueue';
import Logger from '../../logger';

class AgentController {
  constructor() {
    this.findAgent = this.findAgent.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.handleError = this.handleError.bind(this);
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
      const { id: agentId } = req.params;
      const { ticketId, isConfirm } = req.body;
      const ticket = await TicketService.get(ticketId);
      const { owner } = ticket;
      let userConv = null;
      if (isConfirm) {
        AgentQueue.remove(agentId);
        // Update asignnee for ticket
        TicketService.update(ticketId,
          { assignee: agentId });
        // Create chat here

        const userConversationPromise = ConversationService.insert({
          owner,
          members: [agentId],
          ticketId,
        });
        // const agentConversationPromise = ConversationService.insert({
        //   owner: agentId,
        //   members: [owner],
        //   ticketId,
        // });

        [userConv] = await Promise.all([
          userConversationPromise,
          // agentConversationPromise,
        ]);
      }

      const userSocket = UserQueue.getUser(owner.toString());

      userSocket.emit('REQUEST_CONFIRM', {
        ...(userConv || {}),
        isConfirm,
      });
      return res.status(httpStatus.OK).send(userConv);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AgentController();
