import {LOAD_FILE_SUCCESS, UNLOAD_FILE} from './actions';
import localforage from 'localforage';

export const serialize = store => next => action => {
  if(action.type == LOAD_FILE_SUCCESS) {
    localforage.setItem('gtfs', action.data);
  }
  else if(action.type == UNLOAD_FILE) {
    localforage.removeItem('gtfs');
  }
  next(action);
}

export function load() {
  return localforage.getItem('gtfs').then(data => {
    if(data == null) {
      return {};
    }
    else {
      console.log('Loading from debug storage');
      return {
        feed: {
          data: data,
          loading: false,
          error: null
        }
      }
    }
  });
}
