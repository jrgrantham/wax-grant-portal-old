import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./projectData/tasks";
import deadlinesReducer from "./projectData/deadlines";
import projectReducer from "./projectData/project";
import teamReducer from "./projectData/team";
import userReducer from "./projectData/user";
import allocationsReducer from "./projectData/allocations";

const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer,
  deadlines: deadlinesReducer,
  project: projectReducer,
  team: teamReducer,
  allocations: allocationsReducer,
});

export const store = configureStore({ reducer: rootReducer });

// setTimeout(() => {
//   console.log('timer');
//   store.dispatch(dAndMChangedDate({row: deadlineData.data[0], value: 15}));
// }, 3000);

// setTimeout(() => {
//   store.dispatch(wPRowRemoved("ganttRow3"));
// }, 2000);

// setTimeout(() => {
//   store.dispatch(dAndMRowAdded(singleMilOne));
//   store.dispatch(dAndMRowAdded(singleMilTwo));
// }, 500);
