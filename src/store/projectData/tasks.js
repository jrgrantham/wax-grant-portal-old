// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { taskData } from "../../data";
import {
  reorderArrayByIndex,
  // wPScheduleHelper,
  wPUpdateDays,
  updateEditedWp,
  wPUpdateBlock,
  wPCreateNewRow,
} from "../../helpers";

export const wPFetchRequest = createAction("wPFetchRequest");
export const wPFetchSuccess = createAction("wPFetchSuccess");
export const wPFetchFailure = createAction("wPFetchFailure");
export const wPRowAdded = createAction("wPRowAdded");
export const wPRowRemoved = createAction("wPRowRemoved");
export const wPSetNumberOfBars = createAction("wPSetNumberOfBars");
export const wPReorderRows = createAction("wPReorderRows");
export const wPChangeKeyValue = createAction("wPChangeKeyValue");
export const wPDaysUpdated = createAction("wPDaysUpdated");
export const wPEdited = createAction("wPEdited"); // formik modal
export const wPBlockUpdated = createAction("wPBlockUpdated");
export const wPTitleChanged = createAction("wPTitleChanged");
export const wPResourcesUpdated = createAction("wPResourcesUpdated");
export const wPBarMoved = createAction("wPBarMoved");

// const initialState = {
//   loading: false,
//   data: [],
//   error: "",
// };

export default function taskReducer(state = taskData, action) {
  // export default function taskReducer(state = initialState, action) {
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
      const taskId = action.payload.task.taskId;
      const originalIndex = state.data
        .map(function (obj) {
          return obj.taskId;
        })
        .indexOf(taskId);
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
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return action.payload;
          }
          return task;
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
        data: state.data.filter((task) => task.taskId !== action.payload),
      };
    case wPChangeKeyValue.type:
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
    case wPDaysUpdated.type: // spreads the work
      const updatedDaysRow = wPUpdateDays(
        action.payload.task,
        action.payload.days
      );
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.taskId === action.payload.task.taskId) {
            return updatedDaysRow;
          }
          return task;
        }),
      };
    case wPEdited.type:
      const editedRow = updateEditedWp(
        // map over state in the reducer not this function
        action.payload.task,
        action.payload.changes
        // state.data // don't send this
      );
      return {
        ...state,
        data: state.data.map((task) => {
          if (editedRow.taskId === task.taskId) {
            return editedRow;
          }
          return task;
        }),
      };
    case wPBlockUpdated.type:
      const { newValue, oldValue, blockIndex } = action.payload;
      const updatedBlockRow = wPUpdateBlock(
        action.payload.task,
        newValue,
        oldValue,
        blockIndex
      );
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.taskId === action.payload.task.taskId) {
            return updatedBlockRow;
          }
          return task;
        }),
      };
    case wPTitleChanged.type:
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.workPackageTitle === action.payload.oldTitle) {
            return {
              ...task,
              workPackageTitle: action.payload.newTitle,
            };
          }
          return task;
        }),
      };
    case wPResourcesUpdated.type:
      const { name, value } = action.payload;
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return {
              ...task,
              resources: {
                ...task.resources,
                [name]: value,
              },
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
}
