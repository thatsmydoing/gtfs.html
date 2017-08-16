import {load} from './gtfs';

export const LOAD_GAPI_SUCCESS = 'LOAD_GAPI_SUCCESS';
export const LOAD_FILE_REQUEST = 'LOAD_FILE_REQUEST';
export const LOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS';
export const LOAD_FILE_FAILURE = 'LOAD_FILE_FAILURE';
export const UNLOAD_FEED = 'UNLOAD_FEED';
export const CONNECT_SERVER_REQUEST = 'CONNECT_SERVER_REQUEST';
export const CONNECT_SERVER_SUCCESS = 'CONNECT_SERVER_SUCCESS';
export const CONNECT_SERVER_FAILURE = 'CONNECT_SERVER_FAILURE';
export const DISCONNECT_SERVER = 'DISCONNECT_SERVER';
export const NAVIGATE_TO = 'NAVIGATE_TO';

export function loadGApiSuccessful() {
  return {
    type: LOAD_GAPI_SUCCESS
  }
}

export function loadFile(file) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_FILE_REQUEST,
      file
    });
    load(file).then(
      (data) => dispatch({
        type: LOAD_FILE_SUCCESS,
        data
      }),
      (error) => dispatch({
        type: LOAD_FILE_FAILURE,
        error
      })
    );
  }
}

export function unloadFeed() {
  return (dispatch, getState) => {
    let feed = getState().feed;
    if(feed.socket != null) {
      feed.socket.close();
    }
    dispatch({
      type: UNLOAD_FEED
    });
  }
}

export function connectServer(server) {
  return (dispatch, getState) => {
    dispatch({
      type: CONNECT_SERVER_REQUEST
    });
    const ws = new WebSocket(server);
    ws.addEventListener('open', event => {
      dispatch({
        type: CONNECT_SERVER_SUCCESS,
        socket: ws
      })
    });
    ws.addEventListener('error', event => {
      dispatch({
        type: CONNECT_SERVER_FAILURE,
        error: event.error
      })
    });
    ws.addEventListener('message', event => {
      dispatch({
        type: LOAD_FILE_SUCCESS,
        data: JSON.parse(event.data)
      })
    });
  }
}

export function navigateTo(target) {
  return {
    type: NAVIGATE_TO,
    path: target
  }
}
