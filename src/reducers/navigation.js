import {NAVIGATE_TO, navigateTo} from '../actions';

export default function reducer(state = null, action) {
  switch(action.type) {
    case NAVIGATE_TO:
      return action.path
    default:
      return state;
  }
}

function pathToObject(path) {
  let [type, id] = path.substring(1).split('/');
  // we force empty string to undefined
  let result = {type: type || undefined, id: id || undefined};
  if(!type && !id) {
    result = null;
  }
  return result
}

export function getInitialState() {
  return pathToObject(location.hash);
}

export function register(store) {
  window.addEventListener('hashchange', event => {
    let path = pathToObject(location.hash);
    store.dispatch(navigateTo(path, true));
  });
}

export const middleware = store => next => action => {
  if(action.type == NAVIGATE_TO) {
    if(action.event) {
      next(action);
    }
    else if(action.path == null) {
      location.hash = '';
    }
    else {
      let path = '#';
      if(action.path.type) {
        path += action.path.type;
        if(action.path.id) {
          path += '/'+action.path.id;
        }
      }
      location.hash = path;
    }
  }
}
