/* eslint-disable no-underscore-dangle */
class DisconnectQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getJob = userId => this.queue[userId];

  addJob = (job, userId) => {
    this.queue = {
      ...this.queue,
      [userId]: job,
    };
  };

  destroyJob = (userId) => {
    const job = this.queue[userId];
    if (job) {
      job.destroy();
      const { [userId]: _, ...rest } = this.queue;
      this.queue = rest;
    }
  };
}

export default new DisconnectQueue();
