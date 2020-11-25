import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import LayoutDefault from '../pages/_layouts/Default';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isError?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isError = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  const isSigned = !!user;

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isError ? (
          <Component />
        ) : isPrivate === isSigned ? (
          !isSigned ? (
            <Component />
          ) : (
            <LayoutDefault>
              <Component />
            </LayoutDefault>
          )
        ) : (
          <Redirect
            to={{
              pathname: isError ? '/not-found' : isPrivate ? '/' : '/dashboard',
            }}
          />
        );
      }}
    />
  );
};

export default Route;
