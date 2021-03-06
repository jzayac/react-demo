import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isLoaded as isAuthLoaded, loadAuth } from './redux/modules/auth';
import {
  App,
  Main,
  Todo,
  User,
  SignUp,
  NotFound } from './containers';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="todo" component={Todo} />
      <Route path="signup" component={SignUp} />
      <Route onEnter={requireLogin}>
        <Route path="user" component={User} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
