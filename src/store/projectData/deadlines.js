// import axios from "axios";
import { createAction, createSlice } from "@reduxjs/toolkit";

import { deadlineData } from "../../data";

import { v4 as uuidv4 } from "uuid";
// actions

export const dAndMFetchRequest = createAction("dAndMFetchRequest");
export const dAndMFetchSuccess = createAction("dAndMFetchSuccess");
export const dAndMFetchFailure = createAction("dAndMFetchFailure");
export const dAndMRowAdded = createAction("dAndMRowAdded");
export const dAndMRowRemoved = createAction("dAndMRowRemoved");
export const dAndMReorderRows = createAction("dAndMReorderRows");
export const dAndMChangeKeyValue = createAction("dAndMChangeKeyValue");

// export default function deadlinesReducer(state = deadlineData, action) {
//   // export default function deadlinesReducer(state = initialState, action) {
//   switch (action.type) {
//     // case dAndMFetchRequest.type:
//     //   return {
//     //     ...state,
//     //     loading: true,
//     //   };
//     // case dAndMFetchSuccess.type:
//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     data: action.payload,
//     //     error: "",
//     //   };
//     // case dAndMFetchFailure.type:
//     //   return {
//     //     data: [],
//     //     loading: false,
//     //     error: "failed to fetch gantt",
//     //   };
//     default:
//       return state;
//   }
// }

const slice = createSlice({
  name: "deadlines",
  initialState: deadlineData,
  reducers: {
    addDeadline: (deadlines, action) => {
      const { type, position } = action.payload;
      const newDeadline = {
        deadlineId: uuidv4(),
        type,
        description: "Description...",
        scheduled: 0,
      };
      deadlines.data.splice(position, 0, newDeadline);
    },
    deleteDeadline: (deadlines, action) => {
      const { deadlineId } = action.payload;
      const index = deadlines.data.findIndex(
        (deadline) => deadline.deadlineId === deadlineId
      );
      deadlines.data.splice(index, 1);
    },
    updateDeadline: (deadlines, action) => {
      console.log(action.payload);
      const { deadlineId, key, value } = action.payload;
      const index = deadlines.data.findIndex(
        (deadline) => deadline.deadlineId === deadlineId
      );
      deadlines.data[index][key] = value
    },
    reorderDeadline: (deadlines, action) => {
      const { deadlineId, movement } = action.payload;
      const originalIndex = deadlines.data.findIndex(
        (deadline) => deadline.deadlineId === deadlineId
      );
      const newIndex = originalIndex + movement;
      const [deadline] = deadlines.data.splice(originalIndex, 1);
      deadlines.data.splice(newIndex, 0, deadline);
    },
  },
});

export const { reorderDeadline, addDeadline, deleteDeadline, updateDeadline } = slice.actions;
export default slice.reducer;
