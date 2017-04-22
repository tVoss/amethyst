import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
import App from './components/app'


ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={App}>
        </Route>
    </Router>
, document.querySelector('#main'));
