import { Suspense } from "react";

import { Route, Switch } from "react-router-dom";
import NotFound from "@/pages/NotFound";
// 导出
export default function RouterView(props) {
  const { routes } = props;
  return (
    <Suspense fallback="loading">
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={false}
              component={route.component}
            ></Route>
          );
        })}
        <Route>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Suspense>
  );
}
