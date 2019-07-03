import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import BaseController from '../base/base.controller';
import UserService from './user.service';
import TicketService from '../ticket/ticket.service';
import ChatlogService from '../chatlog/chatlog.service';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import check from '../../utils/validate';
import { VALIDATION_TYPE } from '../../../common/enums';
import { hashFunc, compareFunc } from '../../utils/bcrypt';
import {
  sendCreatePasswordMail,
  sendChangePasswordMail,
  sendUpdateProfileMail,
} from '../../mail';
import AgentQueue from '../queue/agentQueue';
import { authenticateSocketIO } from '../../middlewares/authenticateMiddlewares';

class UserController extends BaseController {
  constructor() {
    super(UserService);
  }

  insert = async (req, res) => {
    try {
      const { email, password } = req.body;

      await check(email, VALIDATION_TYPE.EMAIL);
      await check(password, VALIDATION_TYPE.PASSWORD);

      const isEmailExist = await UserService.getByEmail(email);

      if (isEmailExist) {
        const { EMAIL_EXIST } = ERROR_MESSAGE;
        throw new APIError(EMAIL_EXIST, httpStatus.BAD_REQUEST);
      }

      const hash = await hashFunc(password);

      const user = {
        email,
        password: hash,
      };

      const userDoc = await UserService.insert(user);
      UserService.sendVericationEmail(email);

      return res.status(httpStatus.OK).json(userDoc);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async createUser(req, res) {
    try {
      const data = req.body;
      const newUser = await this.service.insert(data);

      return res.status(httpStatus.OK).send(newUser);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async assignRoles(req, res) {
    try {
      const {
        user,
        body: { newRole },
      } = req;

      await user.set('role', newRole);

      return res.status(httpStatus.OK).send(user);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async getUserProfile(req, res) {
    try {
      const { model } = req;
      const userProfile = await UserService.getUserProfile(model);

      return res.status(httpStatus.OK).send(userProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async updateUserProfile(req, res) {
    try {
      const { model } = req;
      const { data } = req.body;
      const newUserProfile = await UserService.updateUserProfile(
        model,
        data,
      );
      sendUpdateProfileMail(newUserProfile);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }


  async changePassword(req, res) {
    try {
      const { user } = req;
      const { oldPassword, newPassword } = req.body;
      await check(oldPassword, VALIDATION_TYPE.STRING);
      await check(newPassword, VALIDATION_TYPE.PASSWORD);

      if (!user.password) {
        return this.createPassword(req, res);
      }

      const checkPassword = await compareFunc(oldPassword, user.password);

      if (!checkPassword) {
        const { PASSWORD_INCORRECT } = ERROR_MESSAGE;
        throw new APIError(PASSWORD_INCORRECT, httpStatus.FORBIDDEN);
      }

      user.password = await hashFunc(newPassword);
      // Update user's token
      const { _id } = user;
      const token = jwt.sign({ _id }, process.env.SECRET_KEY_JWT);
      user.set({ token });

      const result = await user.save();
      sendChangePasswordMail(user);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async createPassword(req, res) {
    try {
      const { user } = req;
      const { newPassword } = req.body;
      await check(newPassword, VALIDATION_TYPE.PASSWORD);
      const newUserProfile = await UserService.createPassword(
        user,
        newPassword,
      );
      sendCreatePasswordMail(user);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async checkPassword(req, res) {
    try {
      const { userId, password } = req.body;
      const confirmed = await UserService.checkPassword(
        userId,
        password,
      );
      return res.status(httpStatus.OK).send({ confirmed });
    } catch (error) {
      return super.handleError(res, error);
    }
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
      return super.hticketandleError(res, error);
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
            socket.emit('REQUEST_CONFIRM', { agentId: _id, isConfirm });
          }
        }
      );
      return res.status(httpStatus.OK).send({ agentId: _id });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new UserController();
