import { LocationActions } from '../actions';
import defaultState from './defaultState';

export const location = (state = defaultState.location, action) => {
  switch (action.type) {
    case LocationActions.UPDATE_LOCATION:
      return { ...action.payload };
    default:
      return state;
  }
};

