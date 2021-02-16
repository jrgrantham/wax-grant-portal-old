import configureStore from './projectData/configureStore'

import { singleRow } from "../data/workPackages";
import { rowAdded, rowRemoved } from "./projectData/workPackages";

export const store = configureStore()

setTimeout(() => {
  store.dispatch(rowAdded(singleRow));
}, 1500);

setTimeout(() => {
  store.dispatch(rowRemoved("ganttRow1"));
}, 2000);