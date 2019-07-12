import httpStatus from 'http-status';
import BaseController from '../../base/base.controller';
import ApplicationService from '../../application/application.service';
import TicketService from '../../ticket/ticket.service';
import UserService from '../../user/user.service';
import { ROLES } from '../../../../common/enums';

class UserController extends BaseController {
  constructor() {
    super(UserService);
  }

  get = async (req, res) => {
    try {
      const { model: user } = req;
      const userObj = user.toObject();
      const { role, application: applicationId, _id } = userObj;

      if (role === ROLES.AGENT) {
        const applicationDoc = await ApplicationService.get(applicationId);
        userObj.applicationInfo = applicationDoc;
      }

      if (role === ROLES.AGENT) {
        const ticketCondition = { assignee: _id };
        const populateCondition = { path: 'owner', select: ['_id', 'username'] };
        const tickets = await TicketService.getByConditionWithPopulationInfo(ticketCondition, populateCondition);
        userObj.tickets = tickets;
      } else if (role === ROLES.INDIVIDUAL) {
        const ticketCondition = { owner: _id };
        const populateCondition = { path: 'assignee', select: ['_id', 'username'] };
        const tickets = await TicketService.getByConditionWithPopulationInfo(ticketCondition, populateCondition);
        userObj.tickets = tickets;
      }

      return res.status(httpStatus.OK).send(userObj);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new UserController();
