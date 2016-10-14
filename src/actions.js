import {load} from './gtfs';

export const LOAD_FILE_REQUEST = 'LOAD_FILE_REQUEST';
export const LOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS';
export const LOAD_FILE_FAILURE = 'LOAD_FILE_FAILURE';
export const UNLOAD_FILE = 'UNLOAD_FILE';

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

export function unloadFile() {
  return {
    type: UNLOAD_FILE
  }
}
