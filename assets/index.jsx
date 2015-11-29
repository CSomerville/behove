import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import store from './store/store';
import App from './containers/App';
import CombsView from './containers/CombsView';
import CombView from './containers/CombView';
import CellView from './containers/CellView';
import './styles/main.scss';

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/app/" component={App}>
        <Route path="combs" component={CombsView} />
        <Route path="comb/:id" component={CombView}>
          <Route path="cell/:cellid" component={CellView} />
        </Route>
      </Route>
    </ReduxRouter>
  </Provider>, app);
