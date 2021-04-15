import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Switch, Route, Redirect } from "react-router-dom";

// import HomePage from "./pages/HomePage";
import GanttChart from "./pages/ganttChart";
import Project from "./pages/projectTable";
import HomePage from "./pages/homePage";
import NoResult from "./pages/noResult";
import Team from "./pages/teamTable";
import Costs from "./pages/costs";
import Revenue from "./pages/revenue";

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
    <Route exact path="/project" component={Project} />
    <Route exact path="/team" component={Team} />
    <Route exact path="/costs" component={Costs} />
    <Route exact path="/revenue" component={Revenue} />
    <Route exact path="/" component={HomePage} />
    {/* <Route
      path="/gantt"
      render={(props) => protectedRoute(GanttPage, props)}
    /> */}
    <Route path="/" component={NoResult} />
  </Switch>
);
export default Router;
