import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import store from './store/store';
import App from './containers/App';
import CombsView from './containers/CombsView';
import Test from './containers/Test';

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/app" component={App}>
        <Route path="/app/combs" component={CombsView} />
        <Route path="test" component={Test} />
      </Route>
    </ReduxRouter>
  </Provider>, app);
