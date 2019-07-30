import httpStatus from 'http-status';
import TicketService from '../ticket/ticket.service';
import ConversationService from '../conversation/conversation.service';
import AgentQueue from '../queue/agentQueue';
import UserQueue from '../queue/userQueue';
import Logger from '../../logger';

class AgentController {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }

  handleError(res, error) {
    Logger.error(error.message);
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(status).send(error.message);
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
