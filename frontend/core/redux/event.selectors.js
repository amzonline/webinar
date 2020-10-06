import { createSelector } from 'reselect';

const selectEventMeta = state => state.event.eventMeta;

export const selectEventName = createSelector(
  [selectEventMeta],
  eventMeta => eventMeta.eventName
);

export const selectEventNo = createSelector(
  [selectEventMeta],
  eventMeta => eventMeta.eventNo
);

export const selectEventPlaybackUrl = createSelector(
  [selectEventMeta],
  eventMeta => eventMeta.playbackUrl
);
