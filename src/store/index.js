import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./projectData/tasks";
import deadlinesReducer from "./projectData/deadlines";
import projectReducer from "./projectData/project";
import teamReducer from "./projectData/team";
import userReducer from "./projectData/user";
import allocationsReducer from "./projectData/allocations";
import optionsReducer from "./projectData/options";

const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer,
  deadlines: deadlinesReducer,
  project: projectReducer,
  team: teamReducer,
  allocations: allocationsReducer,
  options: optionsReducer
});

export const store = configureStore({ reducer: rootReducer });