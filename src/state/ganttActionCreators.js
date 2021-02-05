import axios from "axios";
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

  if (barsOverlap(originalBlockDate, newBlockDate, schedule)) {
    console.log("collision");
    return;
  }
  // exit function here when bars overlap... or place in an if...

  const [barStart, barEnd] = getFirstAndLastDateOfBar(
    blockContents.barNumber,
    schedule
  );

  if (blockContents.start && blockContents.end) {
    splitSingleDate(originalBlockDate, newBlockDate, schedule);
  } else if (blockContents.start && newBlockDate >= barEnd) {
    createSingleDate(barEnd, barStart, schedule);
  } else if (blockContents.end && newBlockDate <= barStart) {
    createSingleDate(barStart, barEnd, schedule);
  } else {
    reorderItems(schedule, result);
    setMonthsByFirstAndLast(schedule);
    clearUnworkedMonthValues(schedule);
  }
}

function barsOverlap(originalBlockDate, newBlockDate, schedule) {
  const barNumber = schedule[originalBlockDate].barNumber;
  const firstDate = Math.min(originalBlockDate, newBlockDate);
  const lastDate = Math.max(originalBlockDate, newBlockDate);
  // console.log("checking overlap on (", barNumber, ")", firstDate, lastDate);

  for (let i = firstDate; i < lastDate; i++) {
    let j = i;
    if (newBlockDate > originalBlockDate) {
      j = i + 1;
    }
    // return schedule[j].status;
    if (schedule[j].barNumber !== barNumber && schedule[j].barNumber !== 0) {
      // console.log("collision");
      return true;
    }
    // add a check here when overlapping self from reducing size
  }
  // console.log('loops complete, no collision');
  return false;
}

function getFirstAndLastDateOfBar(barNumber, schedule) {
  const startDate = schedule
    .map(function (block) {
      return block.barNumber;
    })
    .indexOf(barNumber);
  let endDate = 0;
  for (let i = startDate; i < schedule.length; i++) {
    if (schedule[i].end) {
      endDate = i;
      break;
    }
  }
  return [startDate, endDate];
}

function createSingleDate(dateForNewBlock, otherDate, schedule) {
  // console.log("createSingleDate");
  const firstDate = Math.min(dateForNewBlock, otherDate);
  const lastDate = Math.max(dateForNewBlock, otherDate);

  // console.log(firstDate, lastDate);

  for (let i = firstDate; i < lastDate + 1; i++) {
    if (i === dateForNewBlock) {
      console.log('singe, index', i);
      schedule[i].start = true;
      schedule[i].end = true;
      schedule[i].status = true;
    } else {
      console.log('removed, index', i);
      schedule[i].start = false;
      schedule[i].end = false;
      schedule[i].status = false;
      schedule[i].barNumber = 0;
      schedule[i].value = 0;
    }
  }
}

function splitSingleDate(originalBlockDate, newBlockDate, schedule) {
  // console.log("splitSingleDate");

  const barNumber = schedule[originalBlockDate].barNumber;
  const first = Math.min(originalBlockDate, newBlockDate); // startDate = endDate
  const last = Math.max(originalBlockDate, newBlockDate); // startDate = endDate
  schedule[first].start = true;
  schedule[first].end = false;
  schedule[first].barNumber = barNumber;
  schedule[last].end = true;
  schedule[last].start = false;
  setMonthsByFirstAndLast(schedule);
}

function setMonthsByFirstAndLast(schedule) {
  // console.log("setMonthsByFirstAndLast");
  let workingMonth = false;
  let barNumber = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].start) {
      workingMonth = true;
      barNumber = schedule[i].barNumber;
    }
    schedule[i].status = workingMonth;
    schedule[i].barNumber = barNumber;
    if (schedule[i].end) {
      workingMonth = false;
      barNumber = 0;
    }
  }
}

function clearUnworkedMonthValues(schedule) {
  // console.log("clearUnworkedMonthValues");
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status === false) {
      schedule[i].value = 0;
    }
  }
}

function spreadWork(row) {
  const days = row.days;
  const schedule = row.schedule;
  console.log(row);
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

// getFirstAndLastDate()

// action creators

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
  const reorderedGantt = reorderItems(copiedGantt, result);
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
