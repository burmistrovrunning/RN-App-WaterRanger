import { NetworkActions } from '../actions';
import defaultState from './defaultState';

export const online = (state = defaultState.online, action) => {
  switch (action.type) {
    case NetworkActions.UPDATE_STATUS:
      return action.payload;
    default:
      return state;
  }
};

