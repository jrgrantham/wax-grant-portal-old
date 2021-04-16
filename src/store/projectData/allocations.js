// import axios from "axios";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { allocationData } from "../../data";
import { v4 as uuidv4 } from "uuid";

// // export const setTaskBars = createAction("setTaskBars");
// export const addAllocation = createAction("addAllocation");
// export const removeAllocation = createAction("removeAllocation");
// export const updateAllocation = createAction("updateAllocation");
// export const removeTaskAllocations = createAction("removeTaskAllocations");
// export const removePersonAllocations = createAction("removePersonAllocations");

// export default function allocations(state = allocationData, action) {
//   switch (action.type) {
//     case addAllocation.type:
//       return {
//         ...state,
//         data: [
//           ...state.data,
//           {
//             allocationId: uuidv4(),
//             taskId: action.payload.taskId,
//             personId: action.payload.personId,
//             percent: action.payload.value,
//           },
//         ],
//       };
//     case removeAllocation.type:
//       console.log(action.payload);
//       return {
//         ...state,
//         data: state.data.filter(
//           (allocation) =>
//             allocation.allocationId !== action.payload.allocationId
//         ),
//       };
//     case updateAllocation.type:
//       console.log(action.payload);
//       return {
//         ...state,
//         data: state.data.map((allocation) => {
//           if (allocation.allocationId === action.payload.allocationId) {
//             return {
//               ...allocation,
//               percent: action.payload.value,
//             };
//           } else return allocation;
//         }),
//       };
//     case removeTaskAllocations.type:
//       console.log(action.payload);
//       return {
//         ...state,
//         data: state.data.filter(
//           (allocation) => allocation.taskId !== action.payload.taskId
//         ),
//       };
//     case removePersonAllocations.type:
//       console.log(action.payload);
//       return {
//         ...state,
//         data: state.data.filter(
//           (allocation) => allocation.personId !== action.payload.personId
//         ),
//       };
//     default:
//       return state;
//   }
// }

const slice = createSlice({
  name: "allocations",
  initialState: allocationData,
  reducers: {
    addAllocation: (allocations, action) => {
      const { taskId, personId, value } = action.payload;
      const allocation = {
        allocationId: uuidv4(),
        taskId,
        personId,
        percent: value,
      };
      allocations.data.push(allocation);
    },
    updateAllocation: (allocations, action) => {
      console.log(action.payload);
      const { allocationId, key, value } = action.payload;
      const index = allocations.data.findIndex(
        (allocation) => allocation.allocationId === allocationId
      );
      allocations.data[index].percent = value;
    },
    deleteAllocation: (allocations, action) => {
      const { allocationId } = action.payload;
      const index = allocations.data.findIndex(
        (allocation) => allocation.allocationId === allocationId
      );
      allocations.data.splice(index, 1);
    },
    deleteTaskAllocations: (allocations, action) => {
      const { taskId } = action.payload;
      const filtered = allocations.data.filter(
        (allocation) => allocation.taskId !== taskId
      );
      allocations.data = filtered;
    },
    deletePersonAllocations: (allocations, action) => {
      const { personId } = action.payload;
      const filtered = allocations.data.filter(
        (allocation) => allocation.personId !== personId
      );
      allocations.data = filtered;
    },
  },
});

export const {
  addAllocation,
  updateAllocation,
  deleteAllocation,
  deleteTaskAllocations,
  deletePersonAllocations,
} = slice.actions;
export default slice.reducer;
