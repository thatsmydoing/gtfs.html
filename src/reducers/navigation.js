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
  let decodedPath = decodeURIComponent(path).substring(1);
  let index = decodedPath.indexOf('/');
  let type = '';
  let id = '';

  if (index < 0) {
    type = decodedPath;
  } else {
    type = decodedPath.substring(0, index);
    id = decodedPath.substring(index + 1);
  }

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

export function link(type, id) {
  let path = '#';
  if(type) {
    path += type;
    if(id) {
      path += '/'+id;
    }
  }
  return path;
}
