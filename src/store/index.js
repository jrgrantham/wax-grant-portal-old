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

// locations for these...

const team = store.getState().team.data;
export const teamInitialsById = {};
for (let i = 0; i < team.length; i++) {
  teamInitialsById[team[i].personId] = team[i].acronym;
}

// create an object of task allocations from the array
export const taskResources = {
  byTask: {},
  byPerson: {},
};
const allocations = store.getState().allocations.data;
for (let i = 0; i < allocations.length; i++) {
  let task = allocations[i].taskId;
  let person = teamInitialsById[allocations[i].personId];
  
  // create an object by taskID
  // add task object if not exist
  if (!(task in taskResources.byTask)) {
    taskResources.byTask[task] = {};
  }
  // create string of names for task
  if (!("people" in taskResources.byTask[task])) {
    taskResources.byTask[task]["people"] = "";
  }
  if (taskResources.byTask[task]["people"].length > 1) {
    taskResources.byTask[task]["people"] =
      taskResources.byTask[task]["people"] + ", " + person;
  } else {
    taskResources.byTask[task]["people"] = taskResources.byTask[task]["people"] + person;
  }
  // create person object with all information
  if (!(person in taskResources.byTask[allocations[i].taskId])) {
    taskResources.byTask[task][person] = {};
  }
  // assign info to person
  taskResources.byTask[task][person].percent = allocations[i].percent;
  taskResources.byTask[task][person].personId = allocations[i].personId;
  taskResources.byTask[task][person].allocationId = allocations[i].allocationId;

  // create object info by person
  if (!(person in taskResources.byPerson)) {
    taskResources.byPerson[person] = {}
  }
}

console.log(taskResources);
