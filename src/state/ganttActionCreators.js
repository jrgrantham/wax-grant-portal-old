import axios from "axios";
import * as actionType from "./actionTypes";
import * as helpers from "../helpers";

export const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchGanttRequest());
    axios
      .get("url")
      .then((response) => {
        // const gantt = response.data
        // dispatch(fetchGanttSuccess(gantt))
      })
      .catch((error) => {
        //error.message
      });
  };
};

export const fetchGanttRequest = () => {
  return {
    type: actionType.FETCH_GANTT_REQUEST,
  };
};

export const fetchGanttSuccess = (data) => {
  return {
    type: actionType.FETCH_GANTT_SUCCESS,
    payload: data,
  };
};

export const fetchGanttFailure = (error) => {
  return {
    type: actionType.FETCH_GANTT_FAILURE,
    payload: error,
  };
};

export function reorderGanttRows(result, column) {
  // const copiedGantt = Array.from(column); // this here!!!
  // const reorderedGantt = helpers.reorderItems(copiedGantt, result);
  const reorderedGantt = helpers.reorderItems(column, result);
  return {
    type: actionType.MOVE_GANTT_ROWS,
    payload: reorderedGantt,
  };
}

export function reorderGanttBlocks(result, row, isWP) {
  // const rowCopy = {...row}
  const schedule = row.schedule;
  if (isWP) {
    helpers.handleReorderGanttBlocks(row, result);
  } else {
    helpers.reorderItems(schedule, result);
  }
  // console.log('last step before reducer', row);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: row,
  };
}

export function evenlySpreadWork(row) {
  // console.log("action creator - evenlySpreadWorkedMonths");
  helpers.spreadWork(row);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: row,
  };
}

export function setNumberOfBars(row, numberOfBars) {
  // console.log("setNumberOfBars");
  helpers.updateNumberOfBars(row, numberOfBars);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: row,
  };
}
