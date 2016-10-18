import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import * as navigation from './reducers/navigation';
import {load, serialize} from './debug';
import App from './components/App';

load().then(init => {
  init.navigation = navigation.getInitialState();
  let store = createStore(reducer, init, applyMiddleware(thunk, serialize));
  navigation.register(store);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#container')
  );
});
