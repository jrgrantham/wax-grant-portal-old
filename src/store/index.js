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

// locations for these...

console.log('store index');

// export const teamInitialsById = {};
// export const allResources = {};
// const team = store.getState().team.data;
// const allTasks = store.getState().tasks.data;
// team.forEach((person) => {
//   teamInitialsById[person.personId] = person.acronym;
// });
// allTasks.forEach((task) => {
//   const peopleKeys = {};
//   team.forEach((person) => {
//     peopleKeys[person.acronym] = {
//       allocationId: "new",
//       percent: 0,
//     };
//   });
//   allResources[task.taskId] = { completion: 0, people: "", ...peopleKeys };
// });

// const allocations = store.getState().allocations.data;
// for (let i = 0; i < allocations.length; i++) {
//   let curTask = allocations[i].taskId;
//   let curPerson = teamInitialsById[allocations[i].personId];

//   if (allResources[curTask]["people"].length > 1) {
//     allResources[curTask]["people"] =
//       allResources[curTask]["people"] + ", " + curPerson;
//   } else {
//     allResources[curTask]["people"] =
//       allResources[curTask]["people"] + curPerson;
//   }
//   allResources[curTask]["completion"] =
//     allResources[curTask]["completion"] + allocations[i].percent;

//   allResources[curTask][curPerson].percent = allocations[i].percent;
//   allResources[curTask][curPerson].personId = allocations[i].personId;
//   allResources[curTask][curPerson].allocationId = allocations[i].allocationId;
// }
// console.log(allResources);