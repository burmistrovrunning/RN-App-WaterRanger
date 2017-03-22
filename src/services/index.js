export {
  localStorage,
  getFailedForms,
  removeFailedForm,
  removeFromArray,
  removeFromArrayByKey,
  storeFailedForm,
  clearFailedForm
} from './localStorage';
export {
  uploadForm,
  getLocations,
  login,
  facebookLogin
} from './webService';
export {
  isNetworkOnline,
} from './utils';
export {
  watchLocation,
  clearWatchLocation,
  startSubmitFailedDataInterval,
  uploadFailedForms
} from './timer';
export { getClusters } from './cluster';
export { imagePicker } from './imagePicker';

