import React from 'react';
import { Switch } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ResetPassword from '../pages/ResetPassword';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Transactions from '../pages/Transactions';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />

      <Route path="/dashboard" component={Home} isPrivate />
      <Route path="/transactions" component={Transactions} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
