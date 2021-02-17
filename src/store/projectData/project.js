// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { projectData } from "../../data";
import { reorderArrayByIndex, wPScheduleHelper } from "../../helpers";

// actions

export const wPFetchRequest = createAction("wPFetchRequest");
export const wPFetchSuccess = createAction("wPFetchSuccess");
// sort schedule by index to ensure correct order
export const wPFetchFailure = createAction("wPFetchFailure");
export const wPRowAdded = createAction("wPRowAdded");
export const wPRowRemoved = createAction("wPRowRemoved");
export const wPScheduleUpdated = createAction("wPScheduleUpdated");
export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const wPReorderRows = createAction("wPReorderRows");

// reducer

export default function project(state = projectData, action) {
  switch (action.type) {
    case wPFetchRequest.type:
      return {
        ...state,
        loading: true,
      };
    case wPFetchSuccess.type:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case wPFetchFailure.type:
      return {
        data: [],
        loading: false,
        error: "failed to fetch gantt",
      };
    case wPReorderRows.type:
      const rowId = action.payload.row.rowId;
      const originalIndex = state.data
        .map(function (obj) {
          return obj.rowId;
        })
        .indexOf(rowId);
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
    case wPScheduleUpdated.type:
      // const { row, result } = action.payload;
      console.log(action.payload);
      const updatedRow = wPScheduleHelper(
        action.payload.row,
        action.payload.result
      );
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.row.rowId) {
            return updatedRow;
          }
          return row;
        }),
      };
    case wPRowAdded.type:
      const row = action.payload;
      return {
        ...state,
        data: [...state.data, row],
      };
    case wPRowRemoved.type:
      return {
        ...state,
        data: state.data.filter((row) => row.rowId !== action.payload),
      };
    case wPSetNumberOfBars.type:
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.row.rowId) {
            return action.payload.row;
          }
          return row;
        }),
      };
    default:
      return state;
  }
}
