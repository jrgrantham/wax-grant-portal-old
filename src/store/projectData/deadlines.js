// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { deadlineData } from "../../data";
import { reorderArrayByIndex, dAndMCreateNewRow } from "../../helpers";

// actions

export const dAndMFetchRequest = createAction("dAndMFetchRequest");
export const dAndMFetchSuccess = createAction("dAndMFetchSuccess");
export const dAndMFetchFailure = createAction("dAndMFetchFailure");
export const dAndMRowAdded = createAction("dAndMRowAdded");
export const dAndMRowRemoved = createAction("dAndMRowRemoved");
export const dAndMReorderRows = createAction("dAndMReorderRows");
export const dAndMChangeKeyValue = createAction("dAndMChangeKeyValue");

// const initialState = {
//   loading: false,
//   data: [],
//   error: "",
// };

export default function deadlinesReducer(state = deadlineData, action) {
  // export default function deadlinesReducer(state = initialState, action) {
  switch (action.type) {
    case dAndMFetchRequest.type:
      return {
        ...state,
        loading: true,
      };
    case dAndMFetchSuccess.type:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case dAndMFetchFailure.type:
      return {
        data: [],
        loading: false,
        error: "failed to fetch gantt",
      };
    case dAndMReorderRows.type:
      const originalIndex = state.data
        .map(function (obj) {
          return obj.taskId;
        })
        .indexOf(action.payload.taskId);
      const newIndex = originalIndex + action.payload.movement;
      const reordered = reorderArrayByIndex(
        state.data,
        originalIndex,
        newIndex
      );
      return {
        ...state,
        data: reordered,
      };
    case dAndMRowAdded.type:
      const { projectLength, type } = action.payload;
      const newRow = dAndMCreateNewRow(type, projectLength);
      return {
        ...state,
        data: [...state.data, newRow],
      };
    case dAndMRowRemoved.type:
      return {
        ...state,
        data: state.data.filter((task) => task.taskId !== action.payload),
      };
    case dAndMChangeKeyValue.type:
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.taskId === action.payload.taskId) {
            const updatedRow = {
              ...task,
              [action.payload.key]: action.payload.value,
            };
            return updatedRow;
          }
          return task;
        }),
      };
    default:
      return state;
  }
}
