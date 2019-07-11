/* eslint-disable no-underscore-dangle */
class UserQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getUser = userId => this.queue[userId];

  addUser = (id, socket) => {
    this.queue = {
      ...this.queue,
      [id]: socket,
    };
  };

  removeUser = (userId) => {
    const { [userId]: _, ...rest } = this.queue;
    this.queue = rest;
  };
}

export default new UserQueue();
