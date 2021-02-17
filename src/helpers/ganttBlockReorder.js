import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scheduleUpdated } from "../store/projectData/workPackages";
import produce from "immer";
import { store } from "../store";
import {
  reorderItems,
  currentCombinedLengthOfBars,
  getFirstAndLastDateOfBar,
  spreadWork,
} from "./index";

toast.configure();

export function reorderDelMilBlocks(row, result) {
  reorderItems(row.schedule, result);
  store.dispatch(scheduleUpdated( {row: row} ));
  // scheduleUpdated(row)
}

export function reorderWorkPackageBlocks(row, result) {
  const newRow = produce(row, draft => {
    const schedule = draft.schedule;
    const originalBlockDate = result.source.index;
    const newBlockDate = result.destination.index;
    const blockContents = schedule[originalBlockDate];
    const [barStart, barEnd] = getFirstAndLastDateOfBar(
      blockContents.barNumber,
      schedule
    );
  
    if (barsOverlap(originalBlockDate, newBlockDate, schedule)) return;
  
    increaseDaysIfRequired(draft, result, blockContents);
  
    if (blockContents.start && blockContents.end) {
      splitSingleEntry(originalBlockDate, newBlockDate, schedule);
      setPropertiesByFirstAndLast(schedule);
    } else if (blockContents.start && newBlockDate >= barEnd) {
      createSingleEntry(barEnd, barStart, schedule);
    } else if (blockContents.end && newBlockDate <= barStart) {
      createSingleEntry(barStart, barEnd, schedule);
    } else {
      reorderItems(schedule, result);
      setPropertiesByFirstAndLast(schedule);
    }
    spreadWork(draft);

  });

  store.dispatch(scheduleUpdated( {row: newRow} ));
  // scheduleUpdated(row);
  // return row
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
    changeDays(row, result);
  }
  return row;
}

function changeDays(row, result) {
  row.days = newDuration(row, result);
  toast.info("increased number of days", {
    // success, info, warn, error
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2500,
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
      console.log("singe, index", i);
      schedule[i].start = true;
      schedule[i].end = true;
      schedule[i].status = true;
    } else {
      console.log("removed, index", i);
      schedule[i].start = false;
      schedule[i].end = false;
      schedule[i].status = false;
      schedule[i].barNumber = 0;
    }
  }
  return schedule;
}

function splitSingleEntry(originalBlockDate, newBlockDate, schedule) {
  // console.log("splitSingleEntry");
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
