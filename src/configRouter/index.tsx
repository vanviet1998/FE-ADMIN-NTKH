
import { AUTH_CONFIG_API } from 'common/enum';
import DrawerMenu  from 'components/drawMenu';
import { getAuthoz } from 'helper/cookie';
import _React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { PATH } from './path';
import routes from "./router";

function PrivateRoute({ component: Component, ...rest }) {
  const jwt = getAuthoz()
  return (
    <Route
      {...rest}
      render={(props) => jwt
        ? (
          <div className="page">
            <DrawerMenu />
            <div className="wrap-component">
              <Component {...props} />
            </div>
          </div>
        )
        : <Redirect to={PATH.LOGIN} />}
    />
  )
}

export default () => (
  <Switch>
    {routes.map((props, index) => {
      if (props.auth === AUTH_CONFIG_API.REQUIRED) {
        return <PrivateRoute key={index} {...props} />

      }
      return <Route key={index} {...props}></Route>;
    })}
    <Redirect to={PATH.NOT_FOUND} />
  </Switch>
);

