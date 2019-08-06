import { idleTicketTimeOut } from '../../socketio/timer';

/* eslint-disable no-underscore-dangle */
class IdleQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getTimer = ticketId => this.queue[ticketId];

  addTimer = (ticketId) => {
    const timer = idleTicketTimeOut(ticketId);
    this.queue = {
      ...this.queue,
      [ticketId]: timer,
    };
  };

  resetTimer = (ticketId) => {
    const timer = this.queue[ticketId];
    if (timer) {
      clearTimeout(timer);
      const newTimer = idleTicketTimeOut(ticketId);
      this.queue[ticketId] = newTimer;
    } else {
      this.addTimer(ticketId);
    }
  }

  destroyTimer = (ticketId) => {
    const timer = this.queue[ticketId];
    if (timer) {
      clearTimeout(timer);
      const { [ticketId]: _, ...rest } = this.queue;
      this.queue = rest;
    }
  };
}

// eslint-disable-next-line import/no-mutable-exports
let idleQueue = null;

if (!idleQueue) {
  idleQueue = new IdleQueue();
}

export default idleQueue;
