import axios from "axios";
import * as actionType from "./actionTypes";
import * as helpers from "../helpers";

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
    type: actionType.FETCH_WORK_PACKAGE_REQUEST,
  };
};

export const fetchWorkPackageSuccess = (data) => {
  return {
    type: actionType.FETCH_WORK_PACKAGE_SUCCESS,
    payload: data,
  };
};

export const fetchWorkPackageFailure = (error) => {
  return {
    type: actionType.FETCH_WORK_PACKAGE_FAILURE,
    payload: error,
  };
};

export function reorderWorkPackageRows(result, column) {
  // const copiedGantt = Array.from(column); // this here!!!
  // const reorderedGantt = helpers.reorderItems(copiedGantt, result);
  const reorderedGantt = helpers.reorderItems(column, result);
  return {
    type: actionType.MOVE_WORK_PACKAGE_ROWS,
    payload: reorderedGantt,
  };
}

export function reorderWorkPackageBlocks(result, row, isWP) {
  // const rowCopy = {...row}
  const schedule = row.schedule;
  if (isWP) {
    helpers.handleReorderWorkPackageBlocks(row, result);
  } else {
    helpers.reorderItems(schedule, result);
  }
  // console.log('last step before reducer', row);
  return {
    type: actionType.UPDATE_WORK_PACKAGE_ROW,
    payload: row,
  };
}

export function evenlySpreadWork(row) {
  // console.log("action creator - evenlySpreadWorkedMonths");
  helpers.spreadWork(row);
  return {
    type: actionType.UPDATE_WORK_PACKAGE_ROW,
    payload: row,
  };
}

export function setNumberOfBars(row, numberOfBars) {
  // console.log("setNumberOfBars");
  helpers.updateNumberOfBars(row, numberOfBars);
  return {
    type: actionType.UPDATE_WORK_PACKAGE_ROW,
    payload: row,
  };
}
