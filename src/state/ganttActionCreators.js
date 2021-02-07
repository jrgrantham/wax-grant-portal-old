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
  const copiedGantt = Array.from(column);
  const reorderedGantt = helpers.reorderItems(copiedGantt, result);
  return {
    type: actionType.MOVE_GANTT_ROWS,
    payload: reorderedGantt,
  };
}

export function reorderGanttBlocks(result, row) {
  const { schedule, days } = row;
  helpers.handleReorderGanttBlocks(schedule, result, days);
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

export function setNumberOfBars(schedule, numberOfBars) {
  // console.log("setNumberOfBars");
  helpers.updateNumberOfBars(schedule, numberOfBars);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: schedule,
  };
}
