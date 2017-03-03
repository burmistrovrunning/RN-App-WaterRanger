import { localStorage } from './localStorage';
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
