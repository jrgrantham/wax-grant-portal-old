// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { deadlineData } from "../../data";
import { v4 as uuidv4 } from "uuid";

// case dAndMFetchRequest.type:
//   return {
//     ...state,
//     loading: true,
//   };
// case dAndMFetchSuccess.type:
//   return {
//     ...state,
//     loading: false,
//     data: action.payload,
//     error: "",
//   };
// case dAndMFetchFailure.type:
//   return {
//     data: [],
//     loading: false,
//     error: "failed to fetch gantt",
//   };

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
