// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { allocationData } from "../../data";

// export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const wPReorderRows = createAction("wPReorderRows");

export default function allocations(state = allocationData, action) {
  switch (action.type) {
    default:
      return state;
  }
}
