// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { projectData } from "../../data";

// export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const wPReorderRows = createAction("wPReorderRows");

export default function project(state = projectData, action) {
  switch (action.type) {
    default:
      return state;
  }
}
