import { AsyncStorage } from 'react-native';
import GLOBAL from '../Globals';

// upload a form to the server
export async function uploadForm(formToSubmit) {
  const url = GLOBAL.BASE_URL + (formToSubmit.issues ? 'issues' : 'observations');
  // const TOKEN = await AsyncStorage.getItem('accessToken');
  const loginDetailsJSON = await AsyncStorage.getItem('loginDetails');
  const loginDetails = JSON.parse(loginDetailsJSON);
  console.log('uploadForm url', url);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': loginDetails['access-token'],
      'Token-Type': loginDetails['token-type'],
      Accept: 'application/json',
      Client: loginDetails.client,
      Expiry: loginDetails.expiry,
      UID: loginDetails.uid
    },
    body: JSON.stringify(formToSubmit)
  })
  .then(async response => response)
  .catch((error) => {
    console.log('error uploadForm', error);
    return Promise.reject(error);
  });
}

// retrieve the list of cached failed submissions
export async function getFailedForms() {
  const formsToSubmitString = await AsyncStorage.getItem(GLOBAL.FORMS_TO_SUBMIT_KEY);
  let formsToSubmit = [];
  if (formsToSubmitString != null) {
    console.log('getFailedForms', formsToSubmitString);
    formsToSubmit = JSON.parse(formsToSubmitString);
  }
  return formsToSubmit;
}

// remove an object from an array by value
export function removeFromArray(array, value) {
  const idx = array.indexOf(value);
  if (idx !== -1) {
    array.splice(idx, 1);
  }
  return array;
}

// remove an object from an array where the object[key] == value[key]
export function removeFromArrayByKey(key, array, value) {
  let idx = -1;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][key] === value[key]) {
      idx = i;
      break;
    }
  }
  if (idx !== -1) {
    array.splice(idx, 1);
  }
  return array;
}

// add a failed form submission to our cache, to upload later
export async function storeFailedForm(dictToSend) {
  const formsToSubmit = await getFailedForms();
  formsToSubmit.push(dictToSend);

  const newForms = JSON.stringify(formsToSubmit);
  // console.log("New forms value: " + newForms);
  await AsyncStorage.setItem(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
}

// removeFormFromForms
// remove a failed from submission from our cache, for when it has been re-submitted
export async function removeFailedForm(dictToRemove) {
  let formsToSubmit = await getFailedForms();
  formsToSubmit = removeFromArrayByKey('uid', formsToSubmit, dictToRemove);

  const newForms = JSON.stringify(formsToSubmit);
  await AsyncStorage.setItem(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
}
