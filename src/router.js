import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Switch, Route, Redirect } from "react-router-dom";

// import HomePage from "./pages/HomePage";
import GanttChart from "./pages/ganttChart";
import NoResult from "./pages/noResult";
import Trial from "./pages/trial";

// function protectedRoute(Component, props) {
//   // Not really secure. Any token would pass the test.
//   if (localStorage.getItem("token")) {
//     return <Component {...props} />;
//   }
//   return <Redirect to="/login" />;
// }

const Router = () => (
  <Switch>
    {/* <Route exact path="/" component={HomePage} /> */}
    <Route exact path="/gantt" component={GanttChart} />
    <Route exact path="/trial" component={Trial} />
    {/* <Route
      path="/gantt"
      render={(props) => protectedRoute(GanttPage, props)}
    /> */}
    <Route path="/" component={NoResult} />
  </Switch>
);
export default Router;
