import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import produce from "immer";
import {
  currentCombinedLengthOfBars,
  getFirstAndLastDateOfBar,
  spreadWork,
} from "./index";

toast.configure();

export function dAndMScheduleHelper(oldRow, result) {
  const newRow = produce(oldRow, (draft) => {
    const [item] = draft.schedule.splice(result.source.index, 1);
    draft.schedule.splice(result.destination.index, 0, item);
  });
  return newRow;
}

// dragged block arrives in this function first

export function wPScheduleHelper(row, result) {
  const schedule = row.schedule;
  const originalBlockDate = result.source.index;
  const newBlockDate = result.destination.index;
  const blockContents = schedule[originalBlockDate];
  const endOfBar = blockContents.end || blockContents.start;

  const newRow = produce(row, (draft) => {
    const schedule = draft.schedule; // from draft
    const blockContents = schedule[originalBlockDate];
    const [barStart, barEnd] = getFirstAndLastDateOfBar(
      blockContents.barNumber,
      schedule
    );
    const data = {
      schedule,
      blockContents,
      barStart,
      barEnd,
      originalBlockDate,
      newBlockDate,
    };

    if (endOfBar) wPMoveBlockEnd(draft, result);
    else if (blockContents.status) wPMoveWholeBar(data);
  });
  return newRow;
}

function wPMoveBlockEnd(row, result) {
  const schedule = row.schedule;
  const originalBlockDate = result.source.index;
  const newBlockDate = result.destination.index;
  const blockContents = schedule[originalBlockDate];
  const [barStart, barEnd] = getFirstAndLastDateOfBar(
    blockContents.barNumber,
    schedule
  );
  if (barsOverlap(originalBlockDate, newBlockDate, schedule)) return;
  increaseDaysIfRequired(row, result, blockContents);

  if (blockContents.start && blockContents.end) {
    splitSingleEntry(originalBlockDate, newBlockDate, schedule);
    setPropertiesByFirstAndLast(schedule);
  } else if (blockContents.start && newBlockDate >= barEnd) {
    createSingleEntry(barEnd, barStart, schedule);
  } else if (blockContents.end && newBlockDate <= barStart) {
    createSingleEntry(barStart, barEnd, schedule);
  } else {
    reorderWPItems(schedule, result);
    setPropertiesByFirstAndLast(schedule);
  }
  spreadWork(row);
  return row;
}

function wPMoveWholeBar(data) {
  const {
    schedule,
    blockContents,
    barStart,
    barEnd,
    originalBlockDate,
    newBlockDate,
  } = data;
  const movement = newBlockDate - originalBlockDate;
  if (
    barOutsideSchedule(barStart, barEnd, movement, schedule.length) ||
    barsOverlap(barStart, barStart + movement, schedule) ||
    barsOverlap(barEnd, barEnd + movement, schedule)
  ) {
    toast.info("Keep within open space", {
      // success, info, warn, error
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      // autoClose: false,
    });
    return
  }
    // if (barOutsideSchedule(barStart, barEnd, movement, schedule.length)) return;
    // if (barsOverlap(barStart, barStart + movement, schedule)) return;
    // if (barsOverlap(barEnd, barEnd + movement, schedule)) return;
    // console.log(barStart, barEnd);
    const item = schedule.splice(barStart, barEnd - barStart + 1);
  schedule.splice(barStart + movement, 0, ...item);
  return schedule;
}

function barOutsideSchedule(barStart, barEnd, movement, scheduleLength) {
  return barStart + movement < 0 || barEnd + movement > scheduleLength - 1;
}

function barsOverlap(originalBlockDate, newBlockDate, schedule) {
  const barNumber = schedule[originalBlockDate].barNumber;
  const firstDate = Math.min(originalBlockDate, newBlockDate);
  const lastDate = Math.max(originalBlockDate, newBlockDate);
  let j = 0;
  for (let i = firstDate; i < lastDate; i++) {
    j = i;
    if (newBlockDate > originalBlockDate) {
      j = i + 1;
    }
    if (schedule[j].barNumber !== barNumber && schedule[j].barNumber !== 0) {
      return true;
    }
  }
  return false;
}

function increaseDaysIfRequired(row, result, blockContents) {
  if (
    barLengthIsIncreasing(result, blockContents) &&
    newDuration(row, result) > row.days
  ) {
    updateDays(row, result);
  }
  return row;
}

function updateDays(row, result) {
  row.days = newDuration(row, result);
  toast.info("Increased number of days", {
    // success, info, warn, error
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    // autoClose: false,
  });
  return row;
}

function newDuration(row, result) {
  const change = Math.abs(result.destination.index - result.source.index);
  const currentDuration = currentCombinedLengthOfBars(row.schedule);
  return change + currentDuration;
}

function barLengthIsIncreasing(result, blockContents) {
  return (
    (blockContents.start && result.destination.index < result.source.index) ||
    (blockContents.end && result.destination.index > result.source.index)
  );
}

function createSingleEntry(dateForNewBlock, otherDate, schedule) {
  // console.log("createSingleEntry");
  const firstDate = Math.min(dateForNewBlock, otherDate);
  const lastDate = Math.max(dateForNewBlock, otherDate);

  for (let i = firstDate; i < lastDate + 1; i++) {
    schedule[i].value = 0;
    if (i === dateForNewBlock) {
      schedule[i].start = true;
      schedule[i].end = true;
      schedule[i].status = true;
    } else {
      schedule[i].start = false;
      schedule[i].end = false;
      schedule[i].status = false;
      schedule[i].barNumber = 0;
    }
  }
  return schedule;
}

function splitSingleEntry(originalBlockDate, newBlockDate, schedule) {
  const barNumber = schedule[originalBlockDate].barNumber;
  const first = Math.min(originalBlockDate, newBlockDate); // startDate = endDate
  const last = Math.max(originalBlockDate, newBlockDate); // startDate = endDate
  schedule[first].start = true;
  schedule[first].end = false;
  schedule[first].barNumber = barNumber;
  schedule[last].end = true;
  schedule[last].start = false;
  return schedule;
}

function setPropertiesByFirstAndLast(schedule) {
  let workingMonth = false;
  let barNumber = 0;
  for (let i = 0; i < schedule.length; i++) {
    schedule[i].scheduleIndex = i;
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
    if (schedule[i].status === false) {
      schedule[i].value = 0;
    }
  }
  return schedule;
}

export function reorderWPItems(array, result) {
  const [item] = array.splice(result.source.index, 1);
  array.splice(result.destination.index, 0, item);
  return array;
}
