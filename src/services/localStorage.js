/**
 * Created by baebae on 4/6/16.
 */
/**
 * LocalStorage Wrapper
 */
import { AsyncStorage } from 'react-native';
import GLOBAL from '../Globals';

const base = '@WaterRanger-';
export class localStorage {
  static set(key, value) {
    return AsyncStorage.setItem(`${base}${key}`, value.toString());
  }

  static get(key) {
    return AsyncStorage.getItem(`${base}${key}`);
  }

  static remove(key) {
    return AsyncStorage.removeItem(`${base}${key}`);
  }

  static clear() {
    return AsyncStorage.clear();
  }
}

// retrieve the list of cached failed submissions
export async function getFailedForms() {
  const formsToSubmitString = await localStorage.get(GLOBAL.FORMS_TO_SUBMIT_KEY);
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
  await localStorage.set(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
}

// removeFormFromForms
// remove a failed from submission from our cache, for when it has been re-submitted
export async function removeFailedForm(dictToRemove) {
  let formsToSubmit = await getFailedForms();
  formsToSubmit = removeFromArrayByKey('uid', formsToSubmit, dictToRemove);

  const newForms = JSON.stringify(formsToSubmit);
  await localStorage.set(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
}
