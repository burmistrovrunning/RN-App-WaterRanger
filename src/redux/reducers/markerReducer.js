import { MarkerActions } from '../actions';
import defaultState from './defaultState';

export const marker = (state = defaultState.marker, action) => {
  switch (action.type) {
    case MarkerActions.UPDATE_MARKER:
      return { ...action.payload };
    default:
      return state;
  }
};

