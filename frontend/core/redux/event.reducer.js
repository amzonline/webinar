import EventActionTypes from './event.types';

const INITIAL_STATE = {
  event_id: "",
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventActionTypes.EVENT_ID:
      return {
        ...state,
        event_id: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;