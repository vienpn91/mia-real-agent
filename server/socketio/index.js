import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';

const ACTION_MESSAGE = 'ACTION_MESSAGE';

class SocketIOServer {
  constructor(authenticate) {
    this.authenticate = authenticate;
  }

  connect(server) {
    const socketIO = createSocketIO(server);
    socketIO
      .on('connection', socketioJwt.authorize({
        secret: process.env.SECRET_KEY_JWT,
        timeout: 15000, // 15 seconds to send the authentication message
      })).on('authenticated', async (socket) => {
        const { data: user } = await this.authenticate(socket);
        const { email } = user;
        Logger.info(`[Socket.io]: The foul [${email}] has join the fray`);
      });
    socketIO.of('/chat')
      .on('connection',
        socketioJwt.authorize({
          secret: process.env.SECRET_KEY_JWT,
          timeout: 15000, // 15 seconds to send the authentication message
        }))
      .on('authenticated', async (socket) => {
        const { data: user } = await this.authenticate(socket);
        const { email } = user;
        Logger.info(`[Socket.io]: The foul [${email}] has join the fray`);
        socket.on('disconnect', async () => {
          Logger.info('[Socket.io]: The foul has exit the fray');
        });
        const { connected } = socketIO.sockets;
        connected[socket.conn.id] = socket;
      });
    this.socketIO = socketIO;
    return socketIO;
  }

  emitActionMessage(action) {
    this.socketIO.emit(ACTION_MESSAGE, action);
  }
}

export default SocketIOServer;
