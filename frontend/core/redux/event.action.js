import EventActionTypes from './event.types';

export const RegisterEventId = event_id => ({
  type: EventActionTypes.EVENT_ID,
  payload: event_id,
});
