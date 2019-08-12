import TicketService from '../ticket/ticket.service';
import AgentQueue from './agentQueue';
import { getSocketByUser } from '../../socketio';
import { SOCKET_EMIT } from '../../../common/enums';

/* eslint-disable no-underscore-dangle */

const requestAgentTimeOut = ticketId => setTimeout(() => {
  console.log('[Open]: ', ticketId);
  // TicketService.handleTicketOpen(ticketId);
}, 300000);

class RequestQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getRequest = ticketId => this.queue[ticketId];

  addRequest = (ticket) => {
    const { _id: ticketId, category: ticketCategories } = ticket;
    // Emit request to UI
    const queue = AgentQueue.get();
    const agents = queue.filter(
      ({ categories }) => {
        if (!categories) {
          return false;
        }
        return categories
          .some(category => ticketCategories.includes(category));
      }
    );
    if (!agents.length) {
      return null;
    }
    agents.forEach((agent) => {
      // eslint-disable-next-line no-underscore-dangle
      const socket = getSocketByUser(agent);
      if (socket) {
        socket.emit(SOCKET_EMIT.REQUEST_AVAILABLE, ticket.toObject());
      }
    });
    const timer = requestAgentTimeOut(ticketId);
    this.queue = {
      ...this.queue,
      [ticketId]: { agents, timer },
    };
    return { [ticketId]: { agents, timer } };
  };

  acceptRequest = (ticketId, agentId) => {
    console.log(ticketId, agentId);
    // Emit remove request to other agent
  }

  removeReq = (ticketId) => {
    const { [ticketId]: _, ...rest } = this.queue;
    this.queue = rest;
  };
}

export default new RequestQueue();
