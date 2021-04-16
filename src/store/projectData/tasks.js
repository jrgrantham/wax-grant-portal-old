// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { taskData } from "../../data";
import {
  reorderArrayByIndex,
  wPUpdateDays,
  updateEditedWp,
  wPUpdateBlock,
  wPCreateNewRow,
} from "../../helpers";

export const wPFetchRequest = createAction("wPFetchRequest");
export const wPFetchSuccess = createAction("wPFetchSuccess");
export const wPFetchFailure = createAction("wPFetchFailure");

export const addTask = createAction("addTask");
export const removeTask = createAction("removeTask");
export const removeTaskPack = createAction("removeTaskPack");
export const setTaskBars = createAction("setTaskBars");
export const reorderTasks = createAction("reorderTasks");
export const updateTaskKeyValue = createAction("updateTaskKeyValue");
export const updateTaskDays = createAction("updateTaskDays");
export const updateTaskPack = createAction("updateTaskPack"); // formik modal
export const updateTaskBlock = createAction("updateTaskBlock");
export const updateTaskPackTitle = createAction("updateTaskPackTitle");
export const moveTaskBar = createAction("moveTaskBar");

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
    case reorderTasks.type:
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
    case moveTaskBar.type:
      return {
        ...state,
        data: state.data.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return action.payload;
          }
          return task;
        }),
      };
    case addTask.type:
      const { projectLength, title } = action.payload;
      const newRow = wPCreateNewRow(projectLength, title);
      return {
        ...state,
        data: [...state.data, newRow],
      };
    case removeTask.type:
      return {
        ...state,
        data: state.data.filter((task) => task.taskId !== action.payload),
      };
    case removeTaskPack.type:
      return {
        ...state,
        data: state.data.filter(
          (task) => task.workPackageTitle !== action.payload.workPackageTitle
        ),
      };
    case updateTaskKeyValue.type:
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
    case updateTaskDays.type: // spreads the work
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
    case updateTaskPack.type:
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
    case updateTaskBlock.type:
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
    case updateTaskPackTitle.type:
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
    // case wPResourcesUpdated.type:
    //   const { name, value } = action.payload;
    //   return {
    //     ...state,
    //     data: state.data.map((task) => {
    //       if (task.taskId === action.payload.taskId) {
    //         return {
    //           ...task,
    //           resources: {
    //             ...task.resources,
    //             [name]: value,
    //           },
    //         };
    //       }
    //       return task;
    //     }),
    //   };
    default:
      return state;
  }
}
