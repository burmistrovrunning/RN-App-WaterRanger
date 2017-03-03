import { combineReducers } from 'redux';
import { location } from './locationReducer';
import { marker } from './markerReducer';

export default combineReducers({
  location, marker
});
