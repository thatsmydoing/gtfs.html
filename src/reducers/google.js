import {LOAD_GAPI_SUCCESS, loadGApiSuccessful} from '../actions';

window._init_gapi = function() {}

export default function reducer(state = false, action) {
  switch(action.type) {
    case LOAD_GAPI_SUCCESS:
      return true;
    default:
      return state;
  }
}

export function register(store) {
  window._init_gapi = function() {
    store.dispatch(loadGApiSuccessful());
  }
  if(window.google) {
    store.dispatch(loadGApiSuccessful());
  }
}
