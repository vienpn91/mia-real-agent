import { fromJS } from 'immutable';

// import action type
export const MODAL_OPEN = 'modal/MODAL_OPEN';
export const MODAL_CLOSE = 'modal/MODAL_CLOSE';
export const OPEN_CONFIRM_MODAL = 'modal/OPEN_CONFIRM_MODAL';
export const HANDLE_CONFIRM_ACTION = 'modal/HANDLE_CONFIRM_ACTION';

// Modal name
export const modalName = {
  MODAL_ADD_NEW_NEWS: 'MODAL_ADD_NEW_NEWS',
  MODAL_NEWS_DETAIL: 'MODAL_NEWS_DETAIL',
  MODAL_ADD_NEW_BANNER: 'MODAL_ADD_NEW_BANNER',
  MODAL_BANNER_DETAIL: 'MODAL_BANNER_DETAIL',
  MODAL_ORDER_DETAIL: 'MODAL_ORDER_DETAIL',
  MODAL_CONFIRM: 'MODAL_CONFIRM',
  MODAL_ADD_MAIL: 'MODAL_ADD_MAIL',
  MODAL_ADD_NEW_PROMO: 'MODAL_ADD_NEW_PROMO',
  MODAL_PROMO_DETAIL: 'MODAL_PROMO_DETAIL',
  MODAL_USER_DETAIL: 'MODAL_USER_DETAIL',
  MODAL_ADD_NEW_USER: 'MODAL_ADD_NEW_USER',
  MODAL_MESSAGE_DETAIL: 'MODAL_MESSAGE_DETAIL',
  MODAL_REPLY_MESSAGE: 'MODAL_REPLY_MESSAGE',
  MODAL_EXPORT_EXCEL: 'MODAL_EXPORT_EXCEL',
};

export const confirmModalGenre = {
  DELETE: 'DELETE',
};

export const confirmModalKind = {
  PRODUCT: 'PRODUCT',
  NEWS: 'NEWS',
  BANNERS: 'BANNERS',
  SUBSCRIBE: 'SUBSCRIBE',
  PROMO: 'PROMO',
  USER: 'USER',
};
/*
 *
 * Modal actions
 *
 */
function openModal(name, baseUrl) {
  return {
    type: MODAL_OPEN,
    name,
    baseUrl,
  };
}

function closeModal() {
  return {
    type: MODAL_CLOSE,
  };
}

// genre: such as 'delete', 'update' - the action that confirm modal for
// kind: such as 'product', 'category', 'banner' or 'news'
function openConfirmModal(payload) {
  return {
    type: OPEN_CONFIRM_MODAL,
    payload,
  };
}

function handleConfirm() {
  return {
    type: HANDLE_CONFIRM_ACTION,
  };
}

export const actions = {
  openModal,
  closeModal,
  openConfirmModal,
  handleConfirm,
};

// initialState
export const initialState = fromJS({
  isOpen: false,
  name: '',
  baseUrl: '/',
  confirmModal: {
    genre: '',
    kind: '',
    id: '',
    isProcessing: false,
  },
});

// reducer
function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN: {
      const { name, baseUrl } = action;
      return state
        .set('name', name)
        .set('isOpen', true)
        .set('baseUrl', baseUrl);
    }
    case MODAL_CLOSE: {
      return initialState;
    }
    case OPEN_CONFIRM_MODAL: {
      const { payload } = action;
      const {
        genre, kind, id, baseUrl,
      } = payload;
      return state
        .set(
          'confirmModal',
          fromJS({
            genre,
            kind,
            id,
          }),
        )
        .set('name', modalName.MODAL_CONFIRM)
        .set('isOpen', true)
        .set('baseUrl', baseUrl);
    }
    case HANDLE_CONFIRM_ACTION:
      return state.setIn(['confirmModal', 'isProcessing'], true);
    default:
      return state;
  }
}

export default modalReducer;
