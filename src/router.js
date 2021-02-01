import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// import HomePage from "./pages/HomePage";
import GanttChart from "./pages/ganttChart";

function protectedRoute(Component, props) {
  // Not really secure. Any token would pass the test.
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  }
  return <Redirect to="/login" />;
}

const Router = () => (
  <Switch>
    {/* <Route exact path="/" component={HomePage} /> */}
    <Route path="/gantt" component={GanttChart} />
    {/* <Route
      path="/gantt"
      render={(props) => protectedRoute(GanttPage, props)}
    /> */}
  </Switch>
);
export default Router;
