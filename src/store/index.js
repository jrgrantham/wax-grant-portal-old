import configureStore from './projectData/configureStore'

import { singleRow } from "../data/wPData";
import { wPRowAdded, wPRowRemoved } from "./projectData/workPackages";

export const store = configureStore()

setTimeout(() => {
  store.dispatch(wPRowAdded(singleRow));
}, 1500);

setTimeout(() => {
  store.dispatch(wPRowRemoved("ganttRow3"));
}, 2000);