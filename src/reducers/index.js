import {combineReducers} from 'redux';
import feed from './feed';
import navigation from './navigation';

const reducer = combineReducers({
  feed,
  navigation
})

export default reducer;
