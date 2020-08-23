import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';


import DefaultLayout from './containers/DefaultLayout'
import Login from './views/Pages/Login'
import Register from './views/Pages/Register'
import ResetPassword from './views/Pages/ResetPassword/ResetPassword'





//
const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token ) {
    return false;
  }
  return true;
}


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  )} />
)


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login} />
      <Route exact path="/register" name="Register Page" component={Register} />
      <Route exact path="/reset-password" name="Reset Password Page" component={ResetPassword} />
      {/*<Route path="/" component={DefaultLayout} />*/}
      <AuthRoute path="/" component={DefaultLayout} />
    </Switch>
  </BrowserRouter>
);

export default Router;

