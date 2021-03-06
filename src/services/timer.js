import { Platform } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { getFailedForms, removeFailedForms } from './localStorage';
import { uploadForm } from './webService';

let watchID = -1;
let intervalId = -1;
export const clearWatchLocation = () => {
  if (watchID !== -1) {
    navigator.geolocation.clearWatch(watchID);
  }
  if (intervalId !== -1) {
    clearInterval(intervalId);
  }
};
const startWatchLocation = (resolve) => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log('get location success', position);
    resolve({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, error => console.log('error on get location', JSON.stringify(error)), {
    enableHighAccuracy: true, timeout: 1000, maximumAge: 1000
  });
  watchID = navigator.geolocation.watchPosition((position) => {
    resolve({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
  // setTimeout(() => {
  //   resolve({
  //     latitude: 45.3493143,
  //     longitude: -75.8246687
  //   });
  // }, 5000);
};

export const watchLocation = (resolve) => {
  if (Platform.OS === 'android') {
    intervalId = setInterval(async () => {
      const status = await LocationServicesDialogBox.checkLocationPermission();
      if (status === 'enabled') {
        clearInterval(intervalId);
        intervalId = -1;
        startWatchLocation(resolve);
      }
    }, 1000);
  } else {
    startWatchLocation(resolve);
  }
};
const uploadFailedForm = async (data) => {
  console.log('observations', data);
  let ret = false;
  try {
    const response = await uploadForm(data);
    if (response.status === 200 || response.status === 204) {
      console.log('success uploadFailedForm');
      ret = true;
    } else {
      console.log('err uploadFailedForm');
    }
  } catch (err) {
    console.log('err', err);
  }
  return ret;
};

export const uploadFailedForms = async (data) => {
  const observations = [];
  const issues = [];
  data.forEach((item) => {
    if (item.observations) {
      observations.push(item.observations[0]);
    } else if (item.issues) {
      issues.push(item.issues[0]);
    }
  });
  const success = await uploadFailedForm({ observations });
  if (success) {
    await removeFailedForms(observations);
  }
  const success1 = await uploadFailedForm({ issues });
  if (success) {
    await removeFailedForms(issues);
  }
  return success && success1;
};
export const startSubmitFailedDataInterval = async () => {
  try {
    const data = await getFailedForms();
    console.log('data', data);
  } catch (err) {
    console.log('startSubmitObservationInterval err', err);
  }
};
