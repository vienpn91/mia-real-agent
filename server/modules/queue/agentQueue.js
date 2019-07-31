class AgentQueue {
  queue = []

  get = () => this.queue;

  getAgent = agentId => this.queue.find(({ _id }) => agentId === _id);

  add = (agent) => {
    this.queue = this.queue.concat(agent);
  };

  remove = (agentId) => {
    const { queue } = this;
    queue.shift(queue.indexOf(({ _id: removeAgentId }) => agentId === removeAgentId));
    this.queue = queue;
  };
}

// eslint-disable-next-line import/no-mutable-exports
let agentQueue = null;

if (!agentQueue) {
  agentQueue = new AgentQueue();
}

export default agentQueue;
