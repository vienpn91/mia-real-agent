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

export const FIND_AGENT = 'chat/FIND_AGENT';
export const FIND_AGENT_SUCCESS = 'chat/FIND_AGENT_SUCCESS';
export const FIND_AGENT_FAIL = 'chat/FIND_AGENT_FAIL';

export const ACCEPT_AGENT = 'chat/ACCEPT_AGENT';
export const ACCEPT_AGENT_SUCCESS = 'chat/ACCEPT_AGENT_SUCCESS';
export const ACCEPT_AGENT_FAIL = 'chat/ACCEPT_AGENT_FAIL';

export const REQUEST_ACCEPT = 'chat/REQUEST_ACCEPT';
export const REQUEST_CONFIRM = 'chat/REQUEST_CONFIRM';
export const REQUEST_CONFIRM_SUCCESS = 'chat/REQUEST_CONFIRM_SUCCESS';
export const REQUEST_CONFIRM_FAIL = 'chat/REQUEST_CONFIRM_FAIL';

// action creator

const requestConfirmAction = (agentId, ticketId, isConfirm, redirectData) => ({
  type: REQUEST_CONFIRM,
  payload: {
    agentId,
    ticketId,
    isConfirm,
    redirectData,
  },
});

// payload: {
//   ticketId,
//   owner,
//   isConfirm,
// }
const requestConfirmCompleteAction = payload => ({
  type: REQUEST_CONFIRM_SUCCESS,
  payload,
});

const requestConfirmFailAction = errorMessage => ({
  type: REQUEST_CONFIRM_FAIL,
  payload: {
    errorMessage,
  },
});

const requestAcceptAction = ticket => ({
  type: REQUEST_ACCEPT,
  payload: ticket,
});

const acceptAgentAction = agentId => ({
  type: ACCEPT_AGENT,
  payload: {
    agentId,
  },
});

const acceptAgentCompleteAction = () => ({
  type: ACCEPT_AGENT_SUCCESS,
});

const acceptAgentFailAction = errorMessage => ({
  type: ACCEPT_AGENT_FAIL,
  payload: {
    errorMessage,
  },
});

const findAgentAction = ticketId => ({
  type: FIND_AGENT,
  payload: {
    ticketId,
  },
});

const findAgentCompleteAction = agent => ({
  type: FIND_AGENT_SUCCESS,
  payload: agent,
});

const findAgentFailAction = errorMessage => ({
  type: FIND_AGENT_FAIL,
  payload: {
    errorMessage,
  },
});

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

const getChatAction = (ticketId, agentId) => ({
  type: GET_CHAT,
  payload: {
    ticketId,
    agentId,
  },
});

// Same as createChatAction
const getChatCompleteAction = chatData => ({
  type: GET_CHAT_SUCCESS,
  payload: {
    chatData,
  },
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

const getChatIsFindingAgent = ({ chat }) => chat.get('isFindingAgent');

const getChatIsAgentRequesting = ({ chat }) => chat.get('isRequesting');
const getChatIsAgentRequestTicket = ({ chat }) => chat.get('requestTicket');
const getChatIsAgentRequestIsConfirming = ({ chat }) => chat.get('isConfirming');
const getChatIsAgentRequestConfirmRedirectData = ({ chat }) => chat.get('confirmRedirectData');

const initialState = fromJS({
  isCreating: false,
  createError: '',

  isGetting: false,
  getError: '',
  chatData: null,

  isFindingAgent: false,
  findAgentError: '',

  isRequesting: false,
  requestError: '',
  requestTicket: null,
  isConfirming: false,
  confirmError: '',
  confirmRedirectData: null,

  byId: {},
  allIds: [],
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return state.set('isGetting', true)
        .set('chatData', null);
    case GET_CHAT_SUCCESS:
      return state.set('isGetting', false)
        .set('chatData', action.payload.chatData);
    case GET_CHAT_FAIL:
      return state.set('isGetting', false)
        .set('getError', action.errorMessage);

    case UPDATE_CHAT_SUCCESS:
      return state.set('chatData', action.payload);

    case FIND_AGENT:
      return state.set('isFindingAgent', true)
        .set('findAgentError', '');
    case FIND_AGENT_SUCCESS:
      return state.set('isFindingAgent', false);
    case FIND_AGENT_FAIL:
      return state.set('isFindingAgent', false)
        .set('findAgentError', action.errorMessage);

    case REQUEST_ACCEPT:
      return state.set('isRequesting', true)
        .set('requestError', '')
        .set('requestTicket', action.payload);

    case REQUEST_CONFIRM:
      return state.set('isConfirming', true)
        .set('confirmError', '')
        .set('confirmRedirectData', null);

    case REQUEST_CONFIRM_SUCCESS:
      return state.set('isConfirming', false)
        .set('isRequesting', false)
        .set('confirmRedirectData', action.payload);

    case REQUEST_CONFIRM_FAIL:
      return state.set('isConfirming', false)
        .set('confirmError', action.errorMessage);

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

  acceptAgentAction,
  acceptAgentCompleteAction,
  acceptAgentFailAction,

  findAgentAction,
  findAgentCompleteAction,
  findAgentFailAction,

  requestAcceptAction,
  requestConfirmAction,
  requestConfirmCompleteAction,
  requestConfirmFailAction,
};

export const selectors = {
  getChatIsGetting,
  getChatData,

  getChatIsFindingAgent,

  getChatIsAgentRequesting,
  getChatIsAgentRequestTicket,
  getChatIsAgentRequestIsConfirming,
  getChatIsAgentRequestConfirmRedirectData,
};
