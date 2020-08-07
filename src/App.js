import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Welcome from './components/welcome_page/Welcome';
import Admin from './components/admin_page/Admin'
import Ide from './components/ide/Ide'
import Developers from './components/developers/Developers'


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render = {props => (
            <Welcome
              {...props}
            />
          )}
        />
        <Route
          path="/admin/questions"
          exact
          render = {props => (
            <Admin
              {...props}
            />
          )}
        />
        <Route
          path="/ide"
          exact
          render = {props => (
            <Ide
              {...props}
            />
          )}
        />
        <Route
          path="/developers"
          exact
          render = {props => (
            <Developers />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    return (
    	<Fragment>
        {routes}
    	</Fragment>
    );
  }
}

export default withRouter(App);