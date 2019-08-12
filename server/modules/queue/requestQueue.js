/* eslint-disable no-underscore-dangle */
class UserQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getRequest = ticketId => this.queue[ticketId];

  addRequest = (ticketId, agents) => {
    // Emit request to UI
    console.log(agents);

    this.queue = {
      ...this.queue,
      [ticketId]: agents,
    };
  };

  removeReq = (ticketId) => {
    const { [ticketId]: _, ...rest } = this.queue;
    this.queue = rest;
  };
}

export default new UserQueue();
