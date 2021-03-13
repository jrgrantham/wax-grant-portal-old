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
export const wPTitleChanged = createAction("wPTitleChanged");
export const wPResourcesUpdated = createAction("wPResourcesUpdated");
export const wPBarMoved = createAction("wPBarMoved");

// const initialState = {
//   loading: false,
//   data: [],
//   error: "",
// };

export default function workPackageReducer(state = wPDummyData, action) {
  // export default function workPackageReducer(state = initialState, action) {
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
    case wPBarMoved.type: 
      console.log(action.payload);
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.rowId) {
            return action.payload;
          }
          return row;
        }),
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
        data: [...state.data, newRow],
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
      const newData = updateEditedWp(
        action.payload.row,
        action.payload.changes,
        state.data
      );
      return {
        ...state,
        data: newData,
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
    case wPTitleChanged.type:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.workPackageTitle === action.payload.oldTitle) {
            return {
              ...row,
              workPackageTitle: action.payload.newTitle,
            };
          }
          return row;
        }),
      };
    case wPResourcesUpdated.type:
      console.log(action.payload);
      const { name, value } = action.payload;
      console.log(name, value);
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.rowId === action.payload.rowId) {
            return {
              ...row,
              resources: {
                ...row.resources,
                [name]: value,
              },
            };
          }
          return row;
        }),
      };
    default:
      return state;
  }
}
