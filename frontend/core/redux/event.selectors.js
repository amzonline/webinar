import { createSelector } from 'reselect';

const selectEvent = state => state.eventId;

export const selectEventId = createSelector(
  [selectEvent],
  event_id => event_id
);

