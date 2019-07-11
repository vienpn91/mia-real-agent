import UserQueue from '../queue/userQueue';

export const register = (socket, id) => {
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
   *  ticket
   *  message
   * }
   */
  socket.on('reply', (payload) => {
    const { to } = payload;
    const toUser = UserQueue.getUser(to);
    if (!toUser) return;
    toUser.emit('new_message', payload);
  });
};
