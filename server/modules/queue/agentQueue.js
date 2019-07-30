class AgentQueue {
  queue = []

  get = () => this.queue;

  getAgent = agentId => this.queue.find(({ _id }) => agentId === _id);

  add = ({ agent, socketId }) => {
    this.queue = this.queue.concat({
      ...agent,
      socketId,
    });
  };

  remove = (agentId) => {
    const { queue } = this;
    queue.shift(queue.indexOf(({ _id }) => agentId === _id));
    this.queue = queue;
  };
}

export default new AgentQueue();
