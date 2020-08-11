import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Welcome from './components/welcome_page/Welcome';
import Admin from './components/admin_page/Admin'
import Developers from './components/developers/Developers'
import Ide from './components/ide/Ide'


class App extends Component {
  state = {
    isUserAuth: false,
    isAdminAuth: false,
    userAdmin: 'admin',
    error: null,
    userId: null,
    adminId: null,
    token: null
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const adminId = localStorage.getItem('adminId');
    const userId = localStorage.getItem('userId')
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ token: token });
    if(adminId != null) {
      this.setState({ isAdminAuth: true, adminId: adminId });
    }
    if(userId != null) {
      this.setState({ isUserAuth: true, userId: userId });
    }
    this.setAutoLogout(remainingMilliseconds);
  }

  onChangeUserAdmin = (text) => {
    this.setState({
      userAdmin: text
    })
  }

  signupAdminHandler = (event, authData) => {
    event.preventDefault();
    fetch('http://localhost:8000/authAdmin/signup', {
      method: 'PUT',
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
        if(res.status === 422) {
          console.log("Validation failed! Make sure the email address isn't used yet!");
          throw new Error("vfmsteaiuy!");
        }
        if(res.status !== 200 && res.status !== 201) {
          console.log('Creating a admin failed');
          throw new Error("caaf!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ isAdminAuth: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAdminAuth: false,
          error: err
        });
      });
  };

  loginAdminHandler = (event, authData) => {
    event.preventDefault();
    fetch('http://localhost:8000/authAdmin/login', {
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
        if(res.status === 422) {
          console.log('Validation failed!');
          throw new Error('vf!');
        }
        if(res.status !== 200 && res.status !== 201) {
          console.log('Could not authenticate you!');
          throw new Error('cnau!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAdminAuth: true,
          token: resData.token,
          adminId: resData.adminId
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('adminId', resData.adminId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAdminAuth: false,
          error: err
        });
      });
  };

   setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler = () => {
    this.setState({ isAdminAuth: false, isUserAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  signupUserHandler = (event, authData) => {
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

  loginUserHandler = (event, authData) => {
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
    let 
    routes = (
      <Switch>
        <Route
          path="/"
          exact
          render = {props => (
            <Welcome
              {...props}
              onChangeUserAdmin={this.onChangeUserAdmin}
              onUsersignup={this.signupUserHandler}
              onAdminsignup={this.signupAdminHandler}
              onUserlogin={this.loginUserHandler}
              onAdminlogin={this.loginAdminHandler}
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
    if(this.state.isAdminAuth) {
      routes = (
        <Switch>
          <Route
            path="/admin/questions"
            exact
            render = {props => (
              <Admin
                logout={this.logoutHandler}
                token = {this.state.token}
              />
            )}
          />
          <Route
            path="/admin/question/id"
            render = {props => (
              <Admin
                token = {this.state.token}
              />
            )}
          />
          <Route
            path="/admin/contest"
            exact
            render = {props => (
              <Admin
                token = {this.state.token}
              />
            )}
          />
          <Route
            path="/admin/allcontests"
            exact
            render = {props => (
              <Admin
                token = {this.state.token}
              />
            )}
          />
          <Route
            path="/admin/about"
            exact
            render = {props => (
              <Admin
                token = {this.state.token}
              />
            )}
          />
          <Redirect to="/admin/questions" />
        </Switch>
      );
    }
    if(this.state.isUserAuth) {
      routes = (
        <Switch>
          <Route
            path="/ide"
            exact
            render = {props => (
              <Ide
               logoutHandler={this.logoutHandler}
                token = {this.state.token}
              />
            )}
          />
          <Redirect to="/ide" />
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