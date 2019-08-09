import {
  take, takeEvery, call, put, select, all, takeLatest,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import socketIOClient from 'socket.io-client';
import { notification } from 'antd';
import {
  getToken,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  getUserId,
} from '../../reducers/auth';
import { agentNewRequest } from '../../reducers/agents';
import { addNewMessage } from '../../reducers/replies';
import { actions as TICKET_ACTIONS } from '../../reducers/ticket';
import {
  actions as CONVERSATION_ACTIONS, fetchConversation,
  USER_JOIN_CONVERSATION, USER_TYPING, getConverationById, getCurrentConveration, USER_LEFT_CONVERSATION,
} from '../../reducers/conversations';

/* events */
const NEW_MESSAGE = 'NEW_MESSAGE';
const REPLY_MESSAGE = 'REPLY_MESSAGE';
const REQUEST_AVAILABLE = 'REQUEST_AVAILABLE';
const REQUEST_CONFIRM = 'REQUEST_CONFIRM';
// conversation room
const OTHER_JOIN_ROOM = 'OTHER_JOIN_ROOM';
const OTHER_LEFT_ROOM = 'OTHER_LEFT_ROOM';
const RECEIVE_USER_TYPING = 'RECEIVE_USER_TYPING';

let socketConnection;

function createSocketChannel(socket, type) {
  return eventChannel((dispatch) => {
    socket.on(type, dispatch);

    const unsubscribe = () => {
      socket.off(type, dispatch);
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
    const { metadata, reply } = yield take(socketChannel);
    const { conversationId, ticketId } = metadata;
    yield put(addNewMessage(conversationId, reply));
    yield put(TICKET_ACTIONS.getAction(ticketId));
  }
}

function* requestAgent() {
  const socketChannel = yield call(createSocketChannel, socketConnection, REQUEST_AVAILABLE);

  // watch message and relay the action
  while (true) {
    const data = yield take(socketChannel);
    yield put(agentNewRequest(data));
  }
}

function* requestConfirm() {
  const socketChannel = yield call(createSocketChannel, socketConnection, REQUEST_CONFIRM);

  // watch message and relay the action
  while (true) {
    const { ticketId, isConfirm } = yield take(socketChannel);
    if (isConfirm) {
      const conversationId = yield select(getCurrentConveration);
      notification.success({ message: `The Agent had accepted ticket: #${ticketId}` });
      yield put(TICKET_ACTIONS.getAction(ticketId));
      // Update conversation
      yield put(fetchConversation(conversationId));
      yield put(CONVERSATION_ACTIONS.userJoinConversation(conversationId));
    } else {
      notification.error({ message: 'The Agent had declined the request' });
    }
  }
}
function* otherJoinConversation() {
  const socketChannel = yield call(createSocketChannel, socketConnection, OTHER_JOIN_ROOM);

  // watch message and relay the action
  while (true) {
    const { conversationId, userId } = yield take(socketChannel);
    const currentUser = yield select(getUserId);
    if (currentUser !== userId) {
      const conversation = yield select(getConverationById, conversationId);
      // eslint-disable-next-line no-underscore-dangle
      if (conversation && conversationId === conversation._id) {
        const { owner, ticketId } = conversation;
        const role = (owner === userId) ? 'User' : 'Agent';
        yield put(CONVERSATION_ACTIONS.notifiSystemMessage(`${role} has join conversation`, conversationId));
        yield put(TICKET_ACTIONS.getAction(ticketId));
      }
    }
  }
}

function* otherLeftConversation() {
  const socketChannel = yield call(createSocketChannel, socketConnection, OTHER_LEFT_ROOM);

  // watch message and relay the action
  while (true) {
    const { conversationId, userId } = yield take(socketChannel);
    const conversation = yield select(getConverationById, conversationId);
    const currentUser = yield select(getUserId);
    if (currentUser !== userId) {
      // eslint-disable-next-line no-underscore-dangle
      if (conversation && conversationId === conversation._id) {
        const { owner, ticketId } = conversation;
        const role = (owner === userId) ? 'User' : 'Agent';
        yield put(CONVERSATION_ACTIONS.notifiSystemMessage(`${role} has left conversation`, conversationId));
        yield put(TICKET_ACTIONS.getAction(ticketId));
      }
    }
  }
}

function* observeUserTypingConversation() {
  const socketChannel = yield call(createSocketChannel, socketConnection, RECEIVE_USER_TYPING);

  // watch message and relay the action
  while (true) {
    const { conversationId, messages } = yield take(socketChannel);
    yield put(CONVERSATION_ACTIONS.otherUserTyping(conversationId, messages));
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
    otherJoinConversation(),
    otherLeftConversation(),
    observeUserTypingConversation(),
  ]);
}

function* disconnectFlow() {
  if (socketConnection) socketConnection.disconnect();
}

function* userJoinConversation({ payload }) {
  const { conversationId } = payload;
  const userId = yield select(getUserId);
  socketConnection.emit('JOIN_CONVERSATION', { conversationId, userId });
  // socketConnection.emit('JOIN_CONVERSATION', { conversationId, userId });
}

function* userLeftConversation({ payload }) {
  const { conversationId } = payload;
  const userId = yield select(getUserId);
  socketConnection.emit('LEFT_CONVERSATION', { conversationId, userId });
}

function* userTyping({ payload }) {
  const { conversationId, messages } = payload;
  const userId = yield select(getUserId);
  socketConnection.emit('USER_TYPING', { conversationId, userId, messages });
}

function* socketIOFlow() {
  yield takeEvery([AUTH_LOGIN_SUCCESS], connectFlow);
  yield takeEvery(AUTH_LOGOUT, disconnectFlow);
  yield takeLatest(USER_JOIN_CONVERSATION, userJoinConversation);
  yield takeLatest(USER_LEFT_CONVERSATION, userLeftConversation);
  yield takeLatest(USER_TYPING, userTyping);
}

export function emitReply(from, to, conversation, messages) {
  socketConnection.emit(REPLY_MESSAGE, {
    from,
    to,
    conversation,
    messages,
  });
}

export default socketIOFlow;
