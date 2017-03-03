import { localStorage } from './localStorage';
import { isNetworkOnline } from './utils';
import GLOBAL from '../Globals';

const getHeader = async () => {
  const loginDetailsJSON = await localStorage.get('loginDetails');
  const loginDetails = JSON.parse(loginDetailsJSON);
  return {
    'Content-Type': 'application/json',
    'Access-Token': loginDetails['access-token'],
    'Token-Type': loginDetails['token-type'],
    Accept: 'application/json',
    Client: loginDetails.client,
    Expiry: loginDetails.expiry,
    UID: loginDetails.uid
  };
};

// upload a form to the server
export async function uploadForm(formToSubmit) {
  const url = GLOBAL.BASE_URL + (formToSubmit.issues ? 'issues' : 'observations');
  // const TOKEN = await AsyncStorage.getItem('accessToken');

  console.log('uploadForm url', url);
  return fetch(url, {
    method: 'POST',
    headers: getHeader(),
    body: JSON.stringify(formToSubmit)
  })
  .then(async response => response)
  .catch((error) => {
    console.log('error uploadForm', error);
    return Promise.reject(error);
  });
}

export const getLocations = async () => {
  const flagConnected = await isNetworkOnline();
  let ret = [];
  try {
    if (flagConnected) {
      const response = await fetch(`${GLOBAL.BASE_URL}locations`);
      const responseJson = await response.json();
      for (let index = 0; index < responseJson.length; index += 1) {
        const location = responseJson[index];
        const title = location.body_of_water || location.name;
        const id = location.id.toString();
        const currentLocation = {
          id,
          title,
          coordinates: [parseFloat(location.lat), parseFloat(location.lng)],
          type: 'point',
          subtitle: '',
        };
        ret.push(currentLocation);
      }
      await localStorage.set('locations', JSON.stringify(ret));
    } else {
      const strLocations = await localStorage.get('locations');
      ret = JSON.parse(strLocations);
    }
  } catch (err) {
    console.log('getLocations err', err);
  }
  return ret || [];
};
