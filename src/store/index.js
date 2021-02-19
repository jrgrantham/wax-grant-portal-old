import {wPDummyData} from '../data/wPData'
import configureStore from "./projectData/configureStore";
import { wPDaysUpdated } from "./projectData/workPackages";

// console.log(wPDummyData.data[0]);

// import { singleRow } from "../data/wPData";
// import { singleMilOne, singleMilTwo } from "../data/dMData";
// import { dAndMRowAdded } from './projectData/delsAndMils';

export const store = configureStore();

setTimeout(() => {
  store.dispatch(wPDaysUpdated({row: wPDummyData.data[0], value: 5}));
}, 1500);

// setTimeout(() => {
//   store.dispatch(wPRowRemoved("ganttRow3"));
// }, 2000);

// setTimeout(() => {
//   store.dispatch(dAndMRowAdded(singleMilOne));
//   store.dispatch(dAndMRowAdded(singleMilTwo));
// }, 500);
