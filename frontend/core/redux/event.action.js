import EventActionTypes from './event.types';

export const registerEventMeta = eventMeta => ({
  type: EventActionTypes.EVENT_META,
  payload: eventMeta,
});
