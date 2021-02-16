import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import * as helpers from "../../helpers";

import { threeWorkPackages } from "../../data";
import {
  reorderArrayByIndex,
  setArrayIndexAsSortPosition,
} from "../../helpers";

const FETCH_WORK_PACKAGE_REQUEST = "FETCH_WORK_PACKAGE_REQUEST";
const FETCH_WORK_PACKAGE_SUCCESS = "FETCH_WORK_PACKAGE_SUCCESS";
const FETCH_WORK_PACKAGE_FAILURE = "FETCH_WORK_PACKAGE_FAILURE";
const REORDER_WORK_PACKAGE_ROWS = "REORDER_WORK_PACKAGE_ROWS";
const UPDATE_WORK_PACKAGE_ROW = "UPDATE_WORK_PACKAGE_ROW";
const REMOVE_WORK_PACKAGE_ROW = "REMOVE_WORK_PACKAGE_ROW";
const ROW_ADDED = "ROW_ADDED";

export const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchWorkPackageRequest());
    axios
      .get("url")
      .then((response) => {
        // const gantt = response.data
        // dispatch(fetchWorkPackageSuccess(gantt))
      })
      .catch((error) => {
        //error.message
      });
  };
};

export const fetchWorkPackageRequest = () => {
  return {
    type: FETCH_WORK_PACKAGE_REQUEST,
  };
};

export const fetchWorkPackageSuccess = (data) => {
  // sort data by sortPosition then return to state
  return {
    type: FETCH_WORK_PACKAGE_SUCCESS,
    payload: data,
  };
};

export const fetchWorkPackageFailure = (error) => {
  return {
    type: FETCH_WORK_PACKAGE_FAILURE,
    payload: error,
  };
};

export const addNewRow = (newRow) => ({
  type: ROW_ADDED,
  payload: newRow,
});

export const rowAdded = createAction('rowAdded')
export const rowRemoved = createAction('rowRemoved')
export const rowUpdated = createAction('rowUpdated')

export function deleteRow(id) {
  return {
    type: REMOVE_WORK_PACKAGE_ROW,
    payload: { rowId: id },
  };
}

export function reorderWorkPackageRows(row, movement) {
  return {
    type: REORDER_WORK_PACKAGE_ROWS,
    payload: {
      row,
      movement,
    },
  };
}



export function reorderWorkPackageBlocks(result, row, isWP) {
  const schedule = row.schedule;
  if (isWP) {
    helpers.handleReorderWorkPackageBlocks(row, result);
  } else {
    helpers.reorderItems(schedule, result);
  }
  return {
    type: UPDATE_WORK_PACKAGE_ROW,
    payload: row,
  };
}

export function setNumberOfBars(row, numberOfBars) {
  helpers.updateNumberOfBars(row, numberOfBars);
  return {
    type: UPDATE_WORK_PACKAGE_ROW,
    payload: row,
  };
}

export default function workPackageReducer(state = threeWorkPackages, action) {
  switch (action.type) {
    case FETCH_WORK_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WORK_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_WORK_PACKAGE_FAILURE:
      return {
        data: [],
        loading: false,
        error: "failed to fetch gantt",
      };
    case REORDER_WORK_PACKAGE_ROWS:
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
      const reIndexed = setArrayIndexAsSortPosition(reordered);
      // send to server
      return {
        ...state,
        data: reIndexed,
      };
    case UPDATE_WORK_PACKAGE_ROW:
      // console.log(action.payload);
      console.log(state.data);
      return {
        ...state,
        data: state.data.map((entry) => {
          if (entry.rowId === action.payload.rowId) {
            return action.payload;
          }
          return entry;
        }),
      };
    case rowAdded.type:
      const row = action.payload;
      console.log(state.data);
      console.log(row);
      return {
        ...state,
        data: [...state.data, row],
      };
    case rowRemoved.type:
      return {
        ...state,
        data: state.data.filter((row) => row.rowId !== action.payload),
      };
    default:
      return state;
  }
}
