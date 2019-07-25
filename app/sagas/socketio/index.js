import {
  take, takeEvery, call, put, select, all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import socketIOClient from 'socket.io-client';
import { notification } from 'antd';
import {
  getToken,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from '../../reducers/auth';
import { actions } from '../../reducers/chat';

/* events */
const NEW_MESSAGE = 'NEW_MESSAGE';
const REPLY_MESSAGE = 'REPLY_MESSAGE';
const REQUEST_AVAILABLE = 'REQUEST_AVAILABLE';
const REQUEST_CONFIRM = 'REQUEST_CONFIRM';

let socketConnection;

function createSocketChannel(socket, type) {
  return eventChannel((emit) => {
    const handler = (data) => {
      if (data) {
        emit(data);
      }
    };
    socket.on(type, handler);
    const unsubscribe = () => {
      socket.off(type, handler);
    };
    return unsubscribe;
  });
}

function createSocketConnection(token) {
  // const endpoint = process.env.SOCKETIO_ENDPOINT;
  const socket = socketIOClient('/', {
    path: '/chat',
    upgradeTimeout: 30000, // 5 minutes
  });
  socket.heartbeatTimeout = 1000;
  socket.on('connect', () => {
    socket
      .emit('authenticate', { token }) // send the jwt
      .on('unauthorized', (msg) => {
        console.log(`[SOCKET] Unauthorized: ${JSON.stringify(msg.data)}`);
        // socket.disconnect();
      })
      .on('disconnect', (reason) => {
        console.log('[SOCKET] Server disconnected', reason);
        // socketConnection.connect();
      });
  });
  return socket;
}

function* handleNewMessage() {
  const socketChannel = yield call(createSocketChannel, socketConnection, NEW_MESSAGE);

  // watch message and relay the action
  while (true) {
    const data = yield take(socketChannel);
    console.log(data);
    yield put(actions.updateChatAction());
  }
}

function* requestAgent() {
  const socketChannel = yield call(createSocketChannel, socketConnection, REQUEST_AVAILABLE);

  // watch message and relay the action
  while (true) {
    const data = yield take(socketChannel);
    yield put(actions.requestAcceptAction(data));
  }
}

function* requestConfirm() {
  const socketChannel = yield call(createSocketChannel, socketConnection, REQUEST_CONFIRM);

  // watch message and relay the action
  while (true) {
    const { ticketId, isConfirm } = yield take(socketChannel);
    if (isConfirm) {
      notification.success({ message: `The Agent had accepted ticket: #${ticketId}` });
    } else {
      notification.error({ message: 'The Agent had declined the request' });
    }
  }
}

function* connectFlow() {
  const token = yield select(getToken);
  // user is not logged in
  if (!token) return;
  socketConnection = createSocketConnection(token);

  yield all([
    handleNewMessage(),
    requestAgent(),
    requestConfirm(),
  ]);
}

function* disconnectFlow() {
  if (socketConnection) socketConnection.disconnect();
}

function* socketIOFlow() {
  yield takeEvery([AUTH_LOGIN_SUCCESS], connectFlow);
  yield takeEvery(AUTH_LOGOUT, disconnectFlow);
}

export function emitReply(from, to, conversation, message) {
  socketConnection.emit(REPLY_MESSAGE, {
    from,
    to,
    conversation,
    message,
  });
}

export default socketIOFlow;
