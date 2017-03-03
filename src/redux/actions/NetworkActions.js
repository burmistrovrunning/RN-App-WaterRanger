import { createAction } from 'redux-actions';

export const UPDATE_STATUS = 'UPDATE_STATUS';
const updateStatus$ = createAction(UPDATE_STATUS);
export const updateStatus = status =>
  dispatch => dispatch(updateStatus$(status));
