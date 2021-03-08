// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { team } from "../../data";

// export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const wPReorderRows = createAction("wPReorderRows");

export default function project(state = team, action) {
  switch (action.type) {
    default:
      return state;
  }
}
