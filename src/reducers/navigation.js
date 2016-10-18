import {NAVIGATE_TO} from '../actions';

export default function reducer(state = [], action) {
  switch(action.type) {
    case NAVIGATE_TO:
      return [...state, action.path]
    default:
      return state;
  }
}
