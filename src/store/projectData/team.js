// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { team } from "../../data";

// export const setTaskBars = createAction("setTaskBars");
export const reorderTasks = createAction("reorderTasks");

export default function project(state = team, action) {
  switch (action.type) {
    default:
      return state;
  }
}
