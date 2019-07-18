import httpStatus from 'http-status';
import _get from 'lodash/get';
import mongoose from 'mongoose';
import BaseController from '../base/base.controller';
import TicketService from './ticket.service';
import UserService from '../user/user.service';
import ConversationService from '../conversation/conversation.service';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import { ROLES } from '../../../common/enums';

const { CONTENT_NOT_FOUND } = ERROR_MESSAGE;
const emptyObjString = '{}';

class TicketController extends BaseController {
  constructor() {
    super(TicketService);
  }

  get = async (req, res) => {
    try {
      const { model } = req;
      const { _doc } = model;
      const { assignee, owner: ticketOwner } = _doc;
      const user = await UserService.get(ticketOwner);
      const { profile, role: ownerRole } = user;
      let assigneeProfile = null;
      if (assignee) {
        assigneeProfile = (await UserService.get(assignee)).profile;
      }
      return res.status(httpStatus.OK).send(
        {
          ...model,
          _doc: {
            ..._doc,
            ownerProfile: {
              role: ownerRole,
              profile,
            },
            assigneeProfile,
          },
        }
      );
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  load = async (req, res, next, id) => {
    try {
      const { user } = req;
      const { owner } = req.query;
      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const { _id, role } = user;

      if (!mongoose.Types.ObjectId.isValid(owner) && role === ROLES.AGENT) {
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.NOT_FOUND);
      }

      const condition = (role === ROLES.AGENT)
        ? { owner, ticketId: id }
        : { owner: _id, ticketId: id };
      const model = await this.service.getByCondition(condition);

      if (model == null) {
        throw new APIError(CONTENT_NOT_FOUND, httpStatus.NOT_FOUND);
      }
      req.model = model;
      return next();
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  insert = async (req, res) => {
    try {
      const { user, body: data } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }

      const { _id: owner } = user;
      const condition = { owner };
      const totalCount = await this.service.countDocument(condition);

      const newData = {
        ...data,
        ticketId: totalCount + 1,
        owner,
      };

      const result = await this.service.insert(newData);
      const { _id: ticketId } = result;
      try {
        // create a conversation with mia by default
        await ConversationService.insert({
          owner,
          members: ['5d2850fa87883f00e24833eb'],
          ticketId,
        });
      } catch (error) {
        this.service.delete(ticketId);
        throw new Error('Unable to create ticket');
      }
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  getAll = async (req, res) => {
    try {
      const {
        user, query: {
          skip, limit, sort, ...params
        },
      } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const { _id, role } = user;
      const condition = (role === ROLES.AGENT)
        ? { assignee: _id }
        : { owner: _id };

      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = {
          status: 1,
          createdAt: -1,
          ...sortObj,
        };
      }

      const query = JSON.parse(_get(params, 'query', emptyObjString));
      const newQuery = {
        ...query,
        ...condition,
      };

      const result = await this.service.getAll(newQuery, option);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new TicketController(TicketService);
