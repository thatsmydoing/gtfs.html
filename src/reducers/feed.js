import {LOAD_FILE_REQUEST, LOAD_FILE_SUCCESS, LOAD_FILE_FAILURE, UNLOAD_FILE} from '../actions';

const initialState = {
  data: null,
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case LOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      }
    case LOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case UNLOAD_FILE:
      return initialState
    default:
      return state;
  }
}
