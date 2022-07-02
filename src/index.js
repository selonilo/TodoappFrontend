import "react-app-polyfill/ie11";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { NotFound } from "./pages/NotFound";
import App from "./App";
import PrivateRoute from "./routes/PrivateRoute";
import PrimeReact from "primereact/api";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/store";
import 'moment/locale/tr';

PrimeReact.ripple = true;

ReactDOM.render(
  <StoreProvider store={store}>
    <HashRouter>
      <Suspense fallback="loading">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute component={App} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </HashRouter>
  </StoreProvider>,
  document.getElementById("root")
);
