import React from "react";
import { Redirect } from "react-router";

export default function PrivateRoute(props) {
  const Component = props.component;
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Redirect to={"/login"} />;
}
