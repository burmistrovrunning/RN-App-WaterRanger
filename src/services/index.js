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
  login
} from './webService';
export {
  isNetworkOnline,
} from './utils';
export {
  watchLocation,
  clearWatchLocation,
  startSubmitFailedDataInterval
} from './timer';
export { getClusters } from './cluster';
