import { getFailedForms } from './localStorage';

let watchID = -1;
export const clearWatchLocation = () => navigator.geolocation.clearWatch(watchID);

export const watchLocation = (resolve) => {
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
  setTimeout(() => {
    resolve({
      latitude: 45.3493143,
      longitude: -75.8246687
    });
  }, 5000);
};

export const startSubmitFailedDataInterval = async () => {
  try {
    const data = await getFailedForms();
    console.log('data', data);
  } catch (err) {
    console.log('startSubmitObservationInterval err', err);
  }
};
