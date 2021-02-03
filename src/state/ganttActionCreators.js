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

function createSingleDate(newBlockDate, schedule) {
  console.log("createSingleDate", schedule, newBlockDate);

  for (let i = 0; i < schedule.length; i++) {
    schedule[i].start = false;
    schedule[i].end = false;
    schedule[i].status = false;
    schedule[i].value = 0;
    if (i === newBlockDate) {
      schedule[i].start = true;
      schedule[i].end = true;
      schedule[i].status = true;
    }
  }
}

function splitSingleDate(originalBlockDate, newBlockDate, schedule) {
  console.log("splitSingleDate", schedule, originalBlockDate, newBlockDate);

  const first = Math.min(originalBlockDate, newBlockDate); // startDate = endDate
  const last = Math.max(originalBlockDate, newBlockDate); // startDate = endDate
  schedule[first].start = true;
  schedule[first].end = false;
  schedule[last].end = true;
  schedule[last].start = false;
  setMonthsByFirstAndLast(schedule);
}

function setMonthsByFirstAndLast(schedule) {
  // console.log("setMonthsByFirstAndLast");

  let workingMonth = false;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].start) {
      workingMonth = true;
    }
    schedule[i].status = workingMonth;
    if (schedule[i].end) {
      workingMonth = false;
    }
  }
}

function clearUnworkedMonthValues(schedule) {
  // console.log("clearUnworkedMonthValues", schedule);
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status === false) {
      schedule[i].value = 0;
    }
  }
}

function spreadWork(row) {
  const days = row.days;
  const schedule = row.schedule;
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
  const duration = endActivityDate - startActivityDate + 1;
  const Months = Math.floor(days / duration);
  const remainderMonths = days % duration;
  let j = 0;
  for (let i = startActivityDate; i < endActivityDate + 1; i++) {
    if (j < remainderMonths) {
      schedule[i].value = Months + 1;
      j++;
    } else schedule[i].value = Months;
  }
}

// action creators

export function reorderGanttRows(result, column) {
  const reorderedGantt = reorderItems(column, result);
  return {
    type: actionType.MOVE_GANTT_ROWS,
    payload: reorderedGantt,
  };
}

export function reorderGanttBlocks(result, row) {
  const schedule = row.schedule;
  handleReorderGanttBlocks(schedule, result);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: row,
  };
}

export function evenlySpreadWork(row) {
  console.log("action creator - evenlySpreadWorkedMonths");
  spreadWork(row);
  return {
    type: actionType.REASSIGN_GANTT_BLOCKS,
    payload: row,
  };
}
