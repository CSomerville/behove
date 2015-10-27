import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import App from './containers/App';
import { increment } from './actions/index'

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <App />
  </Provider>, app);