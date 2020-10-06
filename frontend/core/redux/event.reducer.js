import EventActionTypes from './event.types';

const INITIAL_STATE = {
  event_id: "",
  eventMeta: {}
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventActionTypes.EVENT_META:
      return {
        ...state,
        eventMeta: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;