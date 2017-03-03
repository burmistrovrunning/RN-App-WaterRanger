import { createAction } from 'redux-actions';

export const UPDATE_MARKER = 'UPDATE_MARKER';
const updateMarker$ = createAction(UPDATE_MARKER);
export const updateMarker = location =>
  dispatch => dispatch(updateMarker$(location));
