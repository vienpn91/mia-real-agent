import httpStatus from 'http-status';
// lodash
import _get from 'lodash/get';

import BaseController from '../../base/base.controller';
import TicketService from '../../ticket/ticket.service';

const emptyObjString = '{}';

class AdminTicketController extends BaseController {
  constructor() {
    super(TicketService);
  }

  insert = async (req, res) => res.status(httpStatus.NOT_FOUND).send()

  getAll = async (req, res) => {
    try {
      const {
        skip = 0, limit = 10, sort, ...params
      } = req.query;
      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }
      const query = JSON.parse(_get(params, 'query', emptyObjString));
      const result = await this.service.getAllWithUserData(query, option);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new AdminTicketController(TicketService);
