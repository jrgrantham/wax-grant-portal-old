import configureStore from "./projectData/configureStore";

// import { singleRow } from "../data/wPData";
// import { singleMilOne, singleMilTwo } from "../data/dMData";
import { wPChangeKeyValue } from "./projectData/workPackages";
// import { dAndMRowAdded } from './projectData/delsAndMils';

export const store = configureStore();

setTimeout(() => {
  store.dispatch(wPChangeKeyValue({rowId: "ganttRow1", key: 'days', value: 5 }));
}, 1500);

// setTimeout(() => {
//   store.dispatch(wPRowRemoved("ganttRow3"));
// }, 2000);

// setTimeout(() => {
//   store.dispatch(dAndMRowAdded(singleMilOne));
//   store.dispatch(dAndMRowAdded(singleMilTwo));
// }, 500);
