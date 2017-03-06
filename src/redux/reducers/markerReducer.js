import { MarkerActions, LocationActions } from '../actions';
import defaultState from './defaultState';

export const marker = (state = defaultState.marker, action) => {
  switch (action.type) {
    case MarkerActions.UPDATE_MARKER:
      return { ...action.payload };
    case LocationActions.INIT_MARKER:
      {
        if (state.id === -1 || state.id === 'gpsLocationMarker') {
          const newState = { ...state };
          newState.id = 'gpsLocationMarker';
          newState.latitude = action.payload.latitude;
          newState.longitude = action.payload.longitude;
          return newState;
        }
        return state;
      }
    default:
      return state;
  }
};

