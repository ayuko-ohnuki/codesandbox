import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { HomeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvidor } from "../providers/LoginUserProviders";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvidor>
        <Route exact path="/">
          <Login />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {HomeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
      </LoginUserProvidor>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
