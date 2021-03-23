// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { allocationData } from "../../data";
import { v4 as uuidv4 } from "uuid";

// export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const addAllocation = createAction("addAllocation");
export const removeAllocation = createAction("removeAllocation");
export const updateAllocation = createAction("updateAllocation");

export default function allocations(state = allocationData, action) {
  switch (action.type) {
    case addAllocation.type:
      console.log(action.payload);

      return {
        ...state,
        data: [
          ...state.data,
          {
            allocationId: uuidv4(),
            taskId: action.payload.taskId,
            personId: action.payload.personId,
            percent: action.payload.value,
          },
        ],
      };
    case removeAllocation.type:
      console.log(action.payload);
      return state;
    case updateAllocation.type:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}
