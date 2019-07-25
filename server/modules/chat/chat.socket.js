import UserQueue from '../queue/userQueue';

export const unregister = (id, socket) => {
  UserQueue.removeUser(id);
  deaf(socket);
};

export const deaf = (socket) => {
  socket.off('REPLY_MESSAGE');
};

export const register = (id, socket) => {
  UserQueue.addUser(id, socket);
  listen(socket);
  socket.on('disconnect', () => {
    UserQueue.removeUser(id);
  });
};

// listening for reply from current user
export const listen = (socket) => {
  /**
   * payload: {
   *  from
   *  to
   *  conversation
   *  message
   * }
   */
  socket.on('REPLY_MESSAGE', (payload) => {
    const { to } = payload;
    const toUser = UserQueue.getUser(to);

    if (!toUser) return;
    toUser.emit('NEW_MESSAGE', payload);
  });
};
