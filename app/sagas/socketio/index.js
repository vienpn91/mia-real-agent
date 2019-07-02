import {
  take, takeEvery, call, put, select,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import socketIOClient from 'socket.io-client';
import {
  getToken,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from '../../reducers/auth';
import { actions } from '../../reducers/chat';

/* events */
const UPDATE_CHAT = 'UPDATE_CHAT';

let socketConnection;

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const handler = (data) => {
      if (data) {
        emit(data);
      }
    };
    socket.on(UPDATE_CHAT, handler);
    const unsubscribe = () => {
      socket.off(UPDATE_CHAT, handler);
    };
    return unsubscribe;
  });
}

function createSocketConnection(token) {
  // const endpoint = process.env.SOCKETIO_ENDPOINT;
  const socket = socketIOClient('/', {
    path: '/chat',
    upgradeTimeout: 30000000, // default value is 10000ms, try changing it to 20k or more
  });
  socket.heartbeatTimeout = 1000;
  socket.on('connect', () => {
    socket
      .emit('authenticate', { token }) // send the jwt
      .on('unauthorized', (msg) => {
        console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        // socket.disconnect();
      })
      .on('disconnect', (reason) => {
        console.log('reasson', reason);
        // socketConnection.connect();
      });
  });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function* connectFlow() {
  const token = yield select(getToken);
  socketConnection = yield call(createSocketConnection, token);
  const socketChannel = yield call(createSocketChannel, socketConnection);

  // watch message and relay the action
  while (true) {
    yield take(socketChannel);
    yield put(actions.updateChatAction());
  }
}

function* disconnectFlow() {
  socketConnection.disconnect();
}

function* socketIOFlow() {
  yield takeEvery([AUTH_LOGIN_SUCCESS,
    'persist/REHYDRATE',
  ], connectFlow);
  yield takeEvery(AUTH_LOGOUT, disconnectFlow);
}

export default socketIOFlow;
