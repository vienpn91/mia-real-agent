import { fromJS } from 'immutable';

export const CREATE_CHAT = 'chat/CREATE_CHAT';
export const CREATE_CHAT_SUCCESS = 'chat/CREATE_CHAT_SUCCESS';
export const CREATE_CHAT_FAIL = 'chat/CREATE_CHAT_FAIL';

export const GET_CHAT = 'chat/GET_CHAT';
export const GET_CHAT_SUCCESS = 'chat/GET_CHAT_SUCCESS';
export const GET_CHAT_FAIL = 'chat/GET_CHAT_FAIL';

export const UPDATE_CHAT = 'chat/UPDATE_CHAT';
export const UPDATE_CHAT_SUCCESS = 'chat/UPDATE_CHAT_SUCCESS';
export const UPDATE_CHAT_FAIL = 'chat/UPDATE_CHAT_FAIL';

export const INSERT_MESSAGE = 'chat/INSERT_MESSAGE';
export const INSERT_MESSAGE_SUCCESS = 'chat/INSERT_MESSAGE_SUCCESS';
export const INSERT_MESSAGE_FAIL = 'chat/INSERT_MESSAGE_FAIL';

// action creator

// payload: {
// ticketId: String,
// from: String,
// to: String,
// messages: {
//   type: [
//     {
//       messageOwner: String,
//       content: String,
//       timestamp: Date,
//     },
//   ],
//   required: true,
// },
// type: String,
// status: String,
// }
const createChatAction = payload => ({
  type: CREATE_CHAT,
  payload,
});


const createChatCompleteAction = () => ({
  type: CREATE_CHAT_SUCCESS,
});

const createChatFailAction = errorMessage => ({
  type: CREATE_CHAT_FAIL,
  payload: {
    errorMessage,
  },
});

const getChatAction = () => ({
  type: GET_CHAT,
});

// Same as createChatAction
const getChatCompleteAction = payload => ({
  type: GET_CHAT_SUCCESS,
  payload,
});

const getChatFailAction = errorMessage => ({
  type: GET_CHAT_FAIL,
  payload: {
    errorMessage,
  },
});

const updateChatAction = () => ({
  type: UPDATE_CHAT,
});

// Same as createChatAction
const updateChatCompleteAction = payload => ({
  type: UPDATE_CHAT_SUCCESS,
  payload,
});

const updateChatFailAction = errorMessage => ({
  type: UPDATE_CHAT_FAIL,
  payload: {
    errorMessage,
  },
});

// payload: {
//   messageOwner: String,
//   content: String,
//   timestamp: Date,
// },
const insertMessageAction = message => ({
  type: INSERT_MESSAGE,
  payload: {
    message,
  },
});


const insertMessageCompleteAction = () => ({
  type: INSERT_MESSAGE_SUCCESS,
});

const insertMessageFailAction = errorMessage => ({
  type: INSERT_MESSAGE_FAIL,
  payload: {
    errorMessage,
  },
});

// selector
const getChatIsGetting = ({ chat }) => chat.get('isGetting');
const getChatData = ({ chat }) => chat.get('chatData');

const initialState = fromJS({
  isCreating: false,
  createError: '',

  isGetting: false,
  getError: '',
  chatData: null,
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return state.set('isGetting', true)
        .set('chatData', null);
    case GET_CHAT_SUCCESS:
      return state.set('isGetting', false)
        .set('chatData', action.payload);
    case GET_CHAT_FAIL:
      return state.set('isGetting', false)
        .set('getError', action.errorMessage);

    case UPDATE_CHAT_SUCCESS:
      return state.set('chatData', action.payload);
    default: return state;
  }
}

export default profileReducer;

export const actions = {
  createChatAction,
  createChatCompleteAction,
  createChatFailAction,

  getChatAction,
  getChatCompleteAction,
  getChatFailAction,

  updateChatAction,
  updateChatCompleteAction,
  updateChatFailAction,

  insertMessageAction,
  insertMessageCompleteAction,
  insertMessageFailAction,
};

export const selectors = {
  getChatIsGetting,
  getChatData,
};
