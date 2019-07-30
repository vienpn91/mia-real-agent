import httpStatus from 'http-status';
import { TICKET_STATUS } from '../../../common/enums';
import TicketService from '../ticket/ticket.service';
import ConversationService from '../conversation/conversation.service';
import AgentQueue from '../queue/agentQueue';
import UserQueue from '../queue/userQueue';
import Logger from '../../logger';

class AgentController {
  constructor() {
    this.handleError = this.handleError.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
  }

  handleError(res, error) {
    Logger.error(error.message);
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(status).send(error.message);
  }

  async acceptRequest(req, res) {
    try {
      const { user: agent } = req;
      const { ticketId, converstionId, isConfirm } = req.body;
      const [ticket, conversation] = await Promise.all([
        TicketService.get(ticketId),
        ConversationService.get(converstionId),
      ]);
      // eslint-disable-next-line no-underscore-dangle
      const agentId = agent._id;

      if (isConfirm && ticket.status === TICKET_STATUS.OPEN) {
        AgentQueue.remove(agentId);

        // update assign and members for tickets and conversations
        ticket.members = agentId;
        // ticket.status = TICKET_STATUS.PROCESSING;
        if (conversation.assignee) {
          conversation.assignee.push(agentId);
        } else {
          conversation.assignee = [agentId];
        }
        await Promise.all([
          ticket.save(),
          conversation.save(),
        ]);

        // Create chat here

        // const userConversationPromise = ConversationService.insert({
        //   owner,
        //   members: [agentId],
        //   ticketId,
        // });
        // const agentConversationPromise = ConversationService.insert({
        //   owner: agentId,
        //   members: [owner],
        //   ticketId,
        // });

        // [userConv] = await Promise.all([
        //   userConversationPromise,
        //   // agentConversationPromise,
        // ]);
      }

      console.log(agent);
      return res.status(httpStatus.OK).send();
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AgentController();
