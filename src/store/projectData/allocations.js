// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { allocationData } from "../../data";
import { v4 as uuidv4 } from "uuid";

// export const setTaskBars = createAction("setTaskBars");
export const addAllocation = createAction("addAllocation");
export const removeAllocation = createAction("removeAllocation");
export const updateAllocation = createAction("updateAllocation");
export const removeTaskAllocations = createAction("removeTaskAllocations");

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
      return {
        ...state,
        data: state.data.filter(
          (allocation) =>
            allocation.allocationId !== action.payload.allocationId
        ),
      };
    case updateAllocation.type:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.map((allocation) => {
          if (allocation.allocationId === action.payload.allocationId) {
            return {
              ...allocation,
              percent: action.payload.value,
            };
          } else return allocation;
        }),
      };
    case removeTaskAllocations.type:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.filter(
          (allocation) => allocation.taskId !== action.payload.taskId
        ),
      };
    default:
      return state;
  }
}
