// Dump data
// [conversationId]: {
//  [userId1]: socket1,
//  [userId2]: socket2,
// }

/* eslint-disable no-underscore-dangle */
class ConversationRoomQueue {
  _queue = {}

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  getRoom = conversationId => this.queue[conversationId];

  newUser = (conversationId, userId, socket) => {
    const room = this.getRoom(conversationId) || {};
    this.queue = {
      ...this.queue,
      [conversationId]: {
        ...room,
        [userId]: socket,
      },
    };
  }

  removeUser = (userId) => {
    Object.keys(this.queue).forEach(
      (conversationId) => {
        const room = this.getRoom(conversationId);
        const { [userId]: _, ...otherUser } = room;
        if (otherUser) {
          this.queue[conversationId] = otherUser;
        } else {
          const { [conversationId]: removeConversation, ...rest } = this.queue;
          this.queue = rest;
        }
      }
    );
  }
}

// eslint-disable-next-line import/no-mutable-exports
let conversationRoomQueue = null;

if (!conversationRoomQueue) {
  conversationRoomQueue = new ConversationRoomQueue();
}

export default ConversationRoomQueue;
