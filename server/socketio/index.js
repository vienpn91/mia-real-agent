import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';
import AgentQueue from '../modules/queue/agentQueue';
import TicketService from '../modules/ticket/ticket.service';
import { ROLES } from '../../common/enums';
import { register, unregister } from '../modules/chat/chat.socket';

const ACTION_MESSAGE = 'ACTION_MESSAGE';
let socketIO;
class SocketIOServer {
  constructor(authenticate) {
    this.authenticate = authenticate;
  }

  connect(server) {
    socketIO = createSocketIO(server, {
      path: '/chat',
    });
    socketIO
      .on('connection',
        socketioJwt.authorize({
          secret: process.env.SECRET_KEY_JWT,
          timeout: 15000, // 15 seconds to send the authentication message
        }))
      .on('authenticated', async (socket) => {
        const { data: user } = await this.authenticate(socket);
        if (!user) {
          // HMR error
          Logger.warning('[Socket.io]: An invalid foul! Disconnecting...');
          socket.disconnect();
          return;
        }
        const { email, role, _id: id } = user;
        const { connected } = socketIO.sockets;
        const { id: socketId } = socket.conn;

        socket.on('disconnect', async () => {
          Logger.info(`[Socket.io]: The foul [${email}] has exit the fray`);
          unregister(id.toString(), socket);
          if (role === ROLES.FREELANCER || role === ROLES.FULLTIME) {
            AgentQueue.remove(user);
          }
          // if user/agent goes offline
          TicketService.handleTicketOffline(user);
        });
        connected[socketId] = socket;
        if (role === ROLES.FREELANCER || role === ROLES.FULLTIME) {
          Logger.info(`[Socket.io]: The Mercenary [${email}] has join the fray`);
          const { _doc } = user;
          AgentQueue.add({ ..._doc, socketId });
        } else {
          Logger.info(`[Socket.io]: The Foul [${email}] has join the fray`);
          register(id.toString(), socket);
        }
        // change status for offlined ticket
        // TicketService.handleTicketOwnerOnline(user);
      });
    this.socketIO = socketIO;
    return socketIO;
  }

  emitActionMessage(action) {
    this.socketIO.emit(ACTION_MESSAGE, action);
  }
}

export const getSocketByUser = (user) => {
  const { socketId } = user;
  const { connected } = socketIO.sockets;
  return connected[socketId];
};

export default SocketIOServer;
