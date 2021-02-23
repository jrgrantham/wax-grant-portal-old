import configureStore from "./projectData/configureStore";
// import { wPDaysUpdated } from "./projectData/workPackages";
// import { dAndMRowAdded, dAndMChangedDate } from './projectData/delsAndMils';

// import {wPDummyData} from '../data/wPData'
// import {dMDummyData} from '../data/dMData'
// console.log(wPDummyData.data[0]);

// import { singleRow } from "../data/wPData";
// import { singleMilOne, singleMilTwo } from "../data/dMData";

export const store = configureStore();

// setTimeout(() => {
//   console.log('timer');
//   store.dispatch(dAndMChangedDate({row: dMDummyData.data[0], value: 15}));
// }, 3000);

// setTimeout(() => {
//   store.dispatch(wPRowRemoved("ganttRow3"));
// }, 2000);

// setTimeout(() => {
//   store.dispatch(dAndMRowAdded(singleMilOne));
//   store.dispatch(dAndMRowAdded(singleMilTwo));
// }, 500);
