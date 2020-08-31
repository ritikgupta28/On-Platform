import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Welcome from './components/welcome_page/Welcome';
import Ide from './components/ide/Ide'
import Admin from './components/admin_page/admin/Admin';
import User from './components/user_page/user/User';
import Developers from './components/developers/Developers';
import ErrorHandler from './components/error_handler/ErrorHandler';
import Contact from './components/welcome_page/Contact'

class App extends Component {
  state = {
    status: null,
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
    fetch('https://agile-lowlands-72745.herokuapp.com/authAdmin/signup', {
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
        this.setState({ status: res.status });
        return res.json();
      })
      .then(resData => {
        if(this.state.status === 422) {
          throw new Error(resData.message);
        }
        if(this.state.status !== 200 && this.state.status !== 201) {
          throw new Error(resData.message);
        }
        this.setState({ isAdminAuth: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        this.setState({
          isAdminAuth: false,
          error: err
        });
      });
  };

  signupUserHandler = (event, authData) => {
    event.preventDefault();
    fetch('https://agile-lowlands-72745.herokuapp.com/authUser/signup', {
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
        this.setState({ status: res.status });
        return res.json();
      })
      .then(resData => {
        if(this.state.status === 422) {
          throw new Error(resData.message);
        }
        if(this.state.status !== 200 && this.state.status !== 201) {
          throw new Error(resData.message);
        }
        this.setState({ isUserAuth: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        this.setState({
          isUserAuth: false,
          error: err
        });
      });
  };

  loginAdminHandler = (event, authData) => {
    event.preventDefault();
    fetch('https://agile-lowlands-72745.herokuapp.com/authAdmin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        this.setState({ status: res.status })
        return res.json();
      })
      .then(resData => {
        if(this.state.status === 401) {
          throw new Error(resData.message);
        }
        if(this.state.status !== 200 && this.state.status !== 201) {
          throw new Error(resData.message);
        }
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
        this.setState({
          isAdminAuth: false,
          error: err
        });
      });
  };

  loginUserHandler = (event, authData) => {
    event.preventDefault();
    fetch('https://agile-lowlands-72745.herokuapp.com/authUser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        this.setState({ status: res.status })
        return res.json();
      })
      .then(resData => {
        if(this.state.status === 401) {
          throw new Error(resData.message);
        }
        if(this.state.status !== 200 && this.state.status !== 201) {
          throw new Error(resData.message);
        }
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
        this.setState({
          isUserAuth: false,
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
    localStorage.removeItem('adminId');
    localStorage.removeItem('userId');
  };

  errorHandler = () => {
    this.setState({ error: null });
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
        <Route
          path="/ide"
          exact
          render = {props => (
            <Ide />
          )}
        />
        <Route
          path="/contact"
          exact
          render = {props => (
            <Contact />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    if(this.state.isAdminAuth) {
      routes = (
      	<Switch>
          <Route
            path="/"
            exact
            render = {props => (
              <Admin
                {...props}
                logout={this.logoutHandler}
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
            path="/"
            exact
            render = {props => (
              <User
                logout={this.logoutHandler}
                token = {this.state.token}
              />
            )}
          />
          <Redirect to="/user/contest" />
        </Switch>
      );
    }

    return (
      <Fragment>
       <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
