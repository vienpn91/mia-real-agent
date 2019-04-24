import { fromJS } from 'immutable';
// import { createSelector } from 'reselect';

// import action type
export const TRAINING_FORM_UPDATE_FIELD = 'trainingForm/UPDATE_FIELD';
export const TRAINING_FORM_UPDATE_ENTITY = 'trainingForm/UPDATE_UPDATE_ENTITY';
export const TRAINING_FORM_ADD_ENTITY = 'trainingForm/UPDATE_ADD_ENTITY';

// initialState
const initialState = fromJS({
  userSay: '',
  intentName: null,
  selectedText: '',
  start: 0,
  end: 0,
  entity: null,
  entityValue: null,
  response: '',
  entities: [
    // {
    //   entity: '',
    //   value: '',
    //   start: null,
    //   end: null,
    //   response: '',
    // },
  ],
});

// action creator
export const updateField = (field, value) => ({
  type: TRAINING_FORM_UPDATE_FIELD,
  payload: {
    field,
    value,
  },
});


export const updateEntity = (index, entity) => ({
  type: TRAINING_FORM_UPDATE_ENTITY,
  payload: {
    index,
    entity,
  },
});

export const addEntity = entity => ({
  type: TRAINING_FORM_ADD_ENTITY,
  payload: {
    entity,
  },
});

export const actions = {
  updateField,
  updateEntity,
  addEntity,
};

// selector
export const selectFormData = ({ trainingForm }) => trainingForm.toJS();
export const selectFieldValue = ({ trainingForm }, fieldName) => trainingForm.get(fieldName);

// reducer
function authReducer(state = initialState, action) {
  switch (action.type) {
    case TRAINING_FORM_UPDATE_FIELD: {
      const { field, value } = action.payload;
      return state.set(field, value);
    }
    default:
      return state;
  }
}

export default authReducer;
