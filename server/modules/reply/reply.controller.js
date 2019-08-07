import httpStatus from 'http-status';
import axios from 'axios';
import BaseController from '../base/base.controller';
import ReplyService from './reply.service';
import { emitNewMessage } from '../chat/chat.socket';
import Logger from '../../logger';
import IdleQueue from '../queue/idleQueue';
import ConversationService from '../conversation/conversation.service';
import TicketService from '../ticket/ticket.service';
import { TICKET_STATUS } from '../../../common/enums';

class ReplyController extends BaseController {
  constructor() {
    super(ReplyService);
    this.insertReply = this.insertReply.bind(this);
    this.getResponseFromMia = this.getResponseFromMia.bind(this);
  }

  async getResponseFromMia(userReply) {
    const { WEBHOOK_ENDPOINT } = process.env;
    if (!WEBHOOK_ENDPOINT) {
      Logger.error('WEBHOOK_ENDPOINT not found');
      return;
    }
    try {
      const response = await axios.post(`${WEBHOOK_ENDPOINT}/api/chats/diagram`, userReply);
      const { data: miaReply } = response;

      console.log(miaReply);

      const reply = {
        conversationId: userReply.conversation,
        from: null,
        messages: 'Message from mia', // miaReply.message
      };

      const newReplyMetadata = {
        from: 'MIA',
        to: userReply.from,
        message: 'Message from mia', // miaReply.message
        conversation: userReply.conversation,
      };

      const newReply = await this.service.insert(reply);
      emitNewMessage(newReplyMetadata, newReply);
    } catch (error) {
      Logger.error('Error while trying to fetch response from mia', error);
    }
  }

  async insertReply(req, res) {
    try {
      const userReply = req.body;
      const { conversationId, from, messages } = userReply;
      const reply = {
        conversationId,
        from,
        messages,
      };
      const newReply = await this.service.insert(reply);
      const { ticketId } = await ConversationService.getOneByQuery({ _id: conversationId });
      TicketService.update(ticketId, { status: TICKET_STATUS.PROCESSING });
      IdleQueue.resetTimer(ticketId);
      if (userReply.to) {
        emitNewMessage({ ...userReply, ticketId }, newReply);
      } else {
        setTimeout(() => this.getResponseFromMia(userReply), 0);
      }


      return res.status(httpStatus.OK).send({ reply: newReply });
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new ReplyController();
