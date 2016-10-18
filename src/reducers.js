import {combineReducers} from 'redux';
import {LOAD_FILE_REQUEST, LOAD_FILE_SUCCESS, LOAD_FILE_FAILURE, UNLOAD_FILE, NAVIGATE_TO} from './actions';

const initialFeedState = {
  data: null,
  loading: false,
  error: null
}

function feedReducer(state = initialFeedState, action) {
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
      return initialFeedState
    default:
      return state;
  }
}

const initialNavigationState = []

function navigationReducer(state = initialNavigationState, action) {
  switch(action.type) {
    case NAVIGATE_TO:
      return [...state, action.path]
    default:
      return state;
  }
}

const reducer = combineReducers({
  feed: feedReducer,
  navigation: navigationReducer
})

export default reducer;
