import store from "./store";
import * as actionType from "./actionTypes";

// helpers

function reorderItems(array, result) {
  // const items = Array.from(array);
  const [item] = array.splice(result.source.index, 1);
  array.splice(result.destination.index, 0, item);
  return array;
}

function handleReorderGanttBlocks(schedule, result) {
  // console.log("handleReorderGanttBlocks", schedule, result);
  const originalBlockDate = result.source.index;
  const newBlockDate = result.destination.index;
  const blockContents = schedule[originalBlockDate];

  const startActivityDate = schedule
    .map(function (block) {
      return block.start;
    })
    .indexOf(true);
  const endActivityDate = schedule
    .map(function (block) {
      return block.end;
    })
    .indexOf(true);

  if (blockContents.start && blockContents.end) {
    splitSingleDate(originalBlockDate, newBlockDate, schedule);
  } else if (
    (blockContents.end && newBlockDate <= startActivityDate) ||
    (blockContents.start && newBlockDate >= endActivityDate)
  ) {
    createSingleDate(newBlockDate, schedule);
  } else {
    reorderItems(schedule, result);
    setMonthsByFirstAndLast(schedule);
    clearUnworkedMonthValues(schedule);
  }
}

function createSingleDate(newBlockDate, rowCopy) {
  console.log("createSingleDate", rowCopy, newBlockDate);

  for (let i = 0; i < rowCopy.length; i++) {
    // rowCopy[i].color = "transparent";
    rowCopy[i].start = false;
    rowCopy[i].end = false;
    rowCopy[i].status = false;
    rowCopy[i].value = 0;
    if (i === newBlockDate) {
      // rowCopy[i].color = "blue";
      rowCopy[i].start = true;
      rowCopy[i].end = true;
      rowCopy[i].status = true;
    }
  }
}

function splitSingleDate(originalBlockDate, newBlockDate, rowCopy) {
  console.log("splitSingleDate", rowCopy, originalBlockDate, newBlockDate);

  const first = Math.min(originalBlockDate, newBlockDate); // startDate = endDate
  const last = Math.max(originalBlockDate, newBlockDate); // startDate = endDate
  rowCopy[first].start = true;
  rowCopy[first].end = false;
  rowCopy[last].end = true;
  rowCopy[last].start = false;
  setMonthsByFirstAndLast(rowCopy);
}

function setMonthsByFirstAndLast(rowCopy) {
  // console.log("setMonthsByFirstAndLast");

  let workingMonth = false;
  for (let i = 0; i < rowCopy.length; i++) {
    // rowCopy[i].color = "transparent";

    if (rowCopy[i].start) {
      // rowCopy[i].color = "blue";
      workingMonth = true;
    }
    // rowCopy[i].color = workingMonth ? "blue" : "transparent";
    rowCopy[i].status = workingMonth;
    if (rowCopy[i].end) {
      workingMonth = false;
    }
  }
}

function clearUnworkedMonthValues(rowCopy) {
  // console.log("clearUnworkedMonthValues", rowCopy);

  for (let i = 0; i < rowCopy.length; i++) {
    if (rowCopy[i].status === false) {
      rowCopy[i].value = 0;
    }
  }
}

// action creators

export function reorderGanttRow(result) {
  // const ganttCopy = Array.from(store.getState().ganttEntries.data);
  const ganttCopy = store.getState().ganttEntries.data;
  const reorderedGantt = reorderItems(ganttCopy, result);
  return {
    type: actionType.MOVE_GANTT_ROWS,
    payload: reorderedGantt,
  };
}

export function reorderGanttBlocks(result, row) {
  // const rowCopy = Array.from(
  //   store.getState().ganttEntries.data[rowIndex].schedule
  // );
  // console.log(row.schedule);
  const schedule = row.schedule;
  handleReorderGanttBlocks(schedule, result);
  // const reorderedGanttBlocks = reorderItems(rowCopy, result);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: row,
  };
}

export function evenlySpreadWork(rowIndex) {
  console.log("action creator - evenlySpreadWorkedMonths");
  const scheduleCopy = Array.from(
    store.getState().ganttEntries.data[rowIndex].schedule
  );
  const days = store.getState().ganttEntries.data[rowIndex].days;
  console.log(scheduleCopy);
  const startActivityDate = scheduleCopy
    .map(function (block) {
      return block.start;
    })
    .indexOf(true);
  const endActivityDate = scheduleCopy
    .map(function (block) {
      return block.start;
    })
    .indexOf(true);
  const duration = endActivityDate - startActivityDate + 1;
  const Months = Math.floor(days / duration);
  const remainderMonths = days % duration;
  let j = 0;
  for (let i = startActivityDate; i < endActivityDate + 1; i++) {
    if (j < remainderMonths) {
      scheduleCopy[i].value = Months + 1;
      j++;
    } else scheduleCopy[i].value = Months;
  }
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: {
      rowIndex,
      scheduleCopy,
    },
  };
}
