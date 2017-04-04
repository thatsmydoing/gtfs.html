import {combineReducers} from 'redux';
import feed from './feed';
import navigation from './navigation';
import google from './google';

const reducer = combineReducers({
  feed,
  navigation,
  google
})

export default reducer;
