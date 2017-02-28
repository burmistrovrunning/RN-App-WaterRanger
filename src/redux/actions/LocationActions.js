import { createAction } from 'redux-actions';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
const updateLocation$ = createAction(UPDATE_LOCATION);
export const updateLocation = location =>
  dispatch => dispatch(updateLocation$(location));
