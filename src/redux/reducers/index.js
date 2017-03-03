import { combineReducers } from 'redux';
import { location } from './locationReducer';
import { marker } from './markerReducer';
import { online } from './onlineReducer';

export default combineReducers({
  location, marker, online
});
