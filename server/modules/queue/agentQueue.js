class AgentQueue {
  queue = []

  get = () => this.queue;

  getAgent = agentId => this.queue.find(({ _id }) => agentId === _id);

  add = (agent) => {
    this.queue = this.queue.concat(agent);
  };

  remove = (agent) => {
    const { queue } = this;
    const { _id } = agent;
    queue.filter(({ _id: removeAgentId }) => _id !== removeAgentId);
    this.queue = queue;
  };
}

// eslint-disable-next-line import/no-mutable-exports
let agentQueue = null;

if (!agentQueue) {
  agentQueue = new AgentQueue();
}

export default agentQueue;
