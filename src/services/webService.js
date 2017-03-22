import { localStorage } from './localStorage';
import { isNetworkOnline } from './utils';
import GLOBAL from '../Globals';

const getHeader = async () => {
  const loginDetailsJSON = await localStorage.get('loginDetails');
  const loginDetails = JSON.parse(loginDetailsJSON);
  return {
    'Access-Token': loginDetails['access-token'],
    'Token-Type': loginDetails['token-type'],
    Client: loginDetails.client,
    Expiry: loginDetails.expiry,
    UID: loginDetails.uid
  };
};

export async function login(email, password) {
  let error = '';
  try {
    const response = await fetch(`${GLOBAL.BASE_URL}auth/sign_in`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    const { map } = response.headers;
    const accessToken = map['access-token'][0] || null;
    const client = map.client[0] || null;
    const expiry = map.expiry[0] || null;
    const tokenType = map['token-type'][0] || null;
    const uid = map.uid[0] || null;
    if (response.status === 200 && accessToken != null) {
      const loginDetails = {
        'access-token': accessToken,
        'token-type': tokenType,
        client,
        expiry,
        uid
      };
      await localStorage.set('accessToken', accessToken);
      await localStorage.set('loginDetails', JSON.stringify(loginDetails));
      await localStorage.set('profile', JSON.stringify(json));
    } else {
      error = 'Please check your login and try again.';
    }
  } catch (err) {
    console.log('login err', err);
    error = 'Please check your login and try again.';
  }
  return error;
}

export async function facebookLogin(token) {
  let error = '';
  try {
    const response = await fetch(`${GLOBAL.URL}users/auth/mobile`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    const json = await response.json();
    const { map } = response.headers;
    const accessToken = map['access-token'][0] || null;
    const client = map.client[0] || null;
    const expiry = map.expiry[0] || null;
    const tokenType = map['token-type'][0] || null;
    const uid = map.uid[0] || null;
    if (response.status === 200 && accessToken != null) {
      const loginDetails = {
        'access-token': accessToken,
        'token-type': tokenType,
        client,
        expiry,
        uid
      };
      await localStorage.set('accessToken', accessToken);
      await localStorage.set('loginDetails', JSON.stringify(loginDetails));
      await localStorage.set('profile', JSON.stringify(json));
    } else {
      error = 'Please check your login and try again.';
    }
  } catch (err) {
    console.log('login err', err);
    error = err;
  }
  return error;
}

/**
 * upload file via fetch
 * @param uri file uri it should be file:///path/to/file/image123.jpg
 * @param name file name like as image123.jpg
 * @param type upload file type image/jpg
 */
export const uploadFile = async (item, name, type) => {
  const file = { uri: item.path, name, type };
  const body = new FormData();
  const headers = await getHeader();
  const url = `${GLOBAL.BASE_URL}${item.type}/${item.id}/images`;
  let ret = true;
  body.append('image', file);
  try {
    console.log('url', url);
    console.log('body', body);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      body
    });
    console.log('uploadFile res', response);
  } catch (err) {
    ret = false;
    console.log('failed', err);
    // alert('failed');
  }
  return ret;
};

/**
 * submit issue/observation to server
 * @status return value for status
 * 200: success
 * -1: no network access
 * *: server error
 */
export async function uploadForm(formToSubmit) {
  let response = { status: -1 };
  const flagConnected = await isNetworkOnline();
  if (flagConnected) {
    try {
      const url = GLOBAL.BASE_URL + (formToSubmit.issues ? 'issues' : 'observations');
      const headers = await getHeader();
      console.log('uploadForm url', url, formToSubmit);
      console.log('headers', headers);
      console.log('uploadForm', formToSubmit);
      response = await fetch(url, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formToSubmit)
      });
      const jsonRes = await response.json();
      response.jsonRes = jsonRes;
      console.log('jsonRes', jsonRes);
      const uploadImages = [];
      const items = formToSubmit.issues ? formToSubmit.issues : formToSubmit.observations;
      const jsonItems = formToSubmit.issues ? jsonRes.issues : jsonRes.observations;
      items.forEach((item) => {
        if (item.imageFile) {
          let id = -1;
          jsonItems.forEach((jsonItem) => {
            if (jsonItem.local_id === item.local_id) {
              id = formToSubmit.issues ? jsonItem.issue_id : jsonItem.observation_id;
            }
          });
          if (id !== -1) {
            uploadImages.push({
              type: formToSubmit.issues ? 'issues' : 'observations',
              id,
              path: item.imageFile.uri
            });
          }
        }
      });
      uploadImages.forEach(async (item) => {
        await uploadFile(item, 'image', 'image/jpg');
      });
      console.log('uploadImages', uploadImages);
    } catch (err) {
      console.log('uploadForm err', err);
      response.status = 400;
    }
  }
  return response;
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

