// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { wPDummyData } from "../../data";
import {
  reorderArrayByIndex,
  wPScheduleHelper,
  wPUpdateDays,
  updateEditedWp,
  wPUpdateBlock,
  wPCreateNewRow,
} from "../../helpers";

export const wPFetchRequest = createAction("wPFetchRequest");
export const wPFetchSuccess = createAction("wPFetchSuccess");
// sort schedule by index to ensure correct order
export const wPFetchFailure = createAction("wPFetchFailure");
export const wPRowAdded = createAction("wPRowAdded");
export const wPRowRemoved = createAction("wPRowRemoved");
export const wPScheduleUpdated = createAction("wPScheduleUpdated");
// export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const wPReorderRows = createAction("wPReorderRows");
export const wPChangeKeyValue = createAction("wPChangeKeyValue");
export const wPDaysUpdated = createAction("wPDaysUpdated");
export const wPEdited = createAction("wPEdited");
export const wPBlockUpdated = createAction("wPBlockUpdated");

export default function workPackageReducer(state = wPDummyData, action) {
  // export default function workPackageReducer(state = {loading: false, data: [], error: ''}, action) {
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
        .map(function(obj) {
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
      // console.log(action.payload);
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
      const { projectLength, title } = action.payload;
      const newRow = wPCreateNewRow(projectLength, title);
      return {
        ...state,
        data: [...state.data, newRow]
      };
    case wPRowRemoved.type:
      return {
        ...state,
        data: state.data.filter((row) => row.rowId !== action.payload),
      };
    case wPChangeKeyValue.type:
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.rowId) {
            const updatedRow = {
              ...row,
              [action.payload.key]: action.payload.value,
            };
            return updatedRow;
          }
          return row;
        }),
      };
    case wPDaysUpdated.type:
      const updatedDaysRow = wPUpdateDays(
        action.payload.row,
        action.payload.days
      );
      console.log("helper");
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.row.rowId) {
            return updatedDaysRow;
          }
          return row;
        }),
      };
    case wPEdited.type:
      const editedRow = updateEditedWp(
        action.payload.row,
        action.payload.changes
      );
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.row.rowId) {
            return editedRow;
          }
          return row;
        }),
      };
    case wPBlockUpdated.type:
      const { newValue, oldValue, blockIndex } = action.payload;
      const updatedBlockRow = wPUpdateBlock(
        action.payload.row,
        newValue,
        oldValue,
        blockIndex
      );
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.row.rowId) {
            return updatedBlockRow;
          }
          return row;
        }),
      };
    default:
      return state;
  }
}
