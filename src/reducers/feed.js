import {
  LOAD_FILE_REQUEST,
  LOAD_FILE_SUCCESS,
  LOAD_FILE_FAILURE,
  CONNECT_SERVER_REQUEST,
  CONNECT_SERVER_SUCCESS,
  CONNECT_SERVER_FAILURE,
  UNLOAD_FEED
} from '../actions';

const initialState = {
  data: null,
  loading: false,
  error: null,
  socket: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CONNECT_SERVER_REQUEST:
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
    case CONNECT_SERVER_FAILURE:
    case LOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case CONNECT_SERVER_SUCCESS:
      return {
        ...state,
        socket: action.socket
      }
    case UNLOAD_FEED:
      return initialState
    default:
      return state;
  }
}
