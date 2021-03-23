// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { projectData } from "../../data";

// export const setTaskBars = createAction("setTaskBars");
export const reorderTasks = createAction("reorderTasks");

export default function project(state = projectData, action) {
  switch (action.type) {
    default:
      return state;
  }
}
