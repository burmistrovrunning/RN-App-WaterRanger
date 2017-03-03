import { createSelector } from 'reselect';

export const location$ = state => state.location;
export const locationSelector = createSelector(location$, location => ({
  location
}));
