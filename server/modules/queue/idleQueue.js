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

  addTimer = (timer, ticketId) => {
    this.queue = {
      ...this.queue,
      [ticketId]: timer,
    };
  };

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
