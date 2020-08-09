import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Welcome from './components/welcome_page/Welcome';
import Admin from './components/admin_page/Admin'
import Ide from './components/ide/Ide'
import Developers from './components/developers/Developers'


class App extends Component {
  state = {
    isUserAuth: false,
    error: null,
    userId: null,
    token: null
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    fetch('http://localhost:8000/authUser/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        name: authData.name
      })
    })
      .then(resData => {
         console.log(resData);
         this.setState({ isUserAuth: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isUserAuth: false,
          error: err
        });
      });
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    fetch('http://localhost:8000/authUser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: authData.name,
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          console.log(res.status);
          //throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          //throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isUserAuth: true,
          token: resData.token,
          userId: resData.userId
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isUserAuth: false,
          error: err
        });
      });
  };
  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render = {props => (
            <Welcome
              {...props}
              onsignup={this.signupHandler}
              onlogin={this.loginHandler}
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
        </Switch>
        );
        if(this.state.isUserAuth) {
        routes = (
        <Switch>
        <Route
          path="/"
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
        <Redirect to="/" />
      }
      </Switch>
    );
    }
    return (
    	<Fragment>
        {routes}
    	</Fragment>
    );
  }
}

export default withRouter(App);