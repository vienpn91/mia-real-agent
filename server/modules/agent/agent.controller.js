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
      const { user } = req;
      console.log(user);
      return res.status(httpStatus.OK).send();
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AgentController();
