import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import * as navigation from './reducers/navigation';
import * as google from './reducers/google';
import {load, serialize} from './debug';
import {connectServer} from './actions';
import App from './components/App';

load().then(init => {
  init.navigation = navigation.getInitialState();
  let store = createStore(reducer, init, applyMiddleware(thunk, serialize));
  navigation.register(store);
  google.register(store);

  if(window.GTFS_WEBSOCKET) {
    store.dispatch(connectServer('ws://'+window.location.host));
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#container')
  );
});
