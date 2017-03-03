import { createSelector } from 'reselect';

export const marker$ = state => state.marker;
export const markerSelector = createSelector(marker$, marker => ({
  marker
}));
