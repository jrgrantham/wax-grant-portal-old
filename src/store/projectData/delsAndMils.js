// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { dMDummyData } from "../../data";
import { reorderArrayByIndex, dAndMScheduleHelper } from "../../helpers";

// actions

export const dAndMFetchRequest = createAction("dAndMFetchRequest");
export const dAndMFetchSuccess = createAction("dAndMFetchSuccess");
export const dAndMFetchFailure = createAction("dAndMFetchFailure");
export const dAndMRowAdded = createAction("dAndMRowAdded");
export const dAndMRowRemoved = createAction("dAndMRowRemoved");
export const dAndMScheduleUpdated = createAction("dAndMScheduleUpdated");
export const dAndMSetNumberOfBars = createAction("dAndMSetNumberOfBars");
export const dAndMReorderRows = createAction("dAndMReorderRows");

// reducer

export default function delsAndMilsReducer(state = dMDummyData, action) {
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
    case dAndMScheduleUpdated.type:
      // const { row, result } = action.payload;
      console.log(action.payload);
      const updatedRow = dAndMScheduleHelper(
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
    case dAndMRowAdded.type:
      const row = action.payload;
      return {
        ...state,
        data: [...state.data, row],
      };
    case dAndMRowRemoved.type:
      return {
        ...state,
        data: state.data.filter((row) => row.rowId !== action.payload),
      };
    default:
      return state;
  }
}