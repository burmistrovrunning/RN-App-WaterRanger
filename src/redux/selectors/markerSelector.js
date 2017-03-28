import { createSelector } from 'reselect';

export const marker$ = state => state.marker;
export const location$ = state => state.location;
export const markerSelector = createSelector(marker$, location$, (marker, location) => ({
  marker, location
}));
