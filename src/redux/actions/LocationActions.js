import { createAction } from 'redux-actions';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
const updateLocation$ = createAction(UPDATE_LOCATION);

export const INIT_MARKER = 'INIT_MARKER';
const initialMarker$ = createAction(INIT_MARKER);

export const updateLocation = location =>
  (dispatch) => {
    dispatch(updateLocation$(location));
    dispatch(initialMarker$(location));
  };
