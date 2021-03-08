// import { emptyBlock } from "../data/workPackages";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentCombinedLengthOfBars } from "./index";

toast.configure();

export function updateEditedWp(oldRow, changes, data) {
  const {
    newWorkPackageTitle,
    newDescription,
    newDayLoading,
    newDays,
    newBars,
  } = changes;
  // let newTitle = false;
  // if (newWorkPackageTitle) newTitle = true;

  const newRow = produce(oldRow, (draft) => {
    if (newWorkPackageTitle) draft.workPackageTitle = newWorkPackageTitle; // check here - update
    if (newDescription) draft.description = newDescription;
    if (newDayLoading) draft.datLoading = newDayLoading;
    if (newDays) {
      updateDays(draft, newDays);
      spreadWork(draft);
    }
    let bars = newBars;
    if (newBars) {
      if (newBars > draft.days) {
        bars = draft.days;
        toast.info("Bars limited to number of days", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
      updateNumberOfBars(draft, bars);
    }
  });

  const newData = data.map((row) => {
    if (newRow.rowId === row.rowId) {
      return newRow;
    }
    return row;
  });
  return newData;
}

function updateDays(draftRow, days) {
  // must take a 'copy' from immer
  let alerted = false;
  draftRow.days = days;
  const schedule = draftRow.schedule;
  let statusCount = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status) statusCount++;
    if (statusCount === days) schedule[i].end = true;
    if (statusCount > days) {
      schedule[i].status = false;
      schedule[i].start = false;
      schedule[i].end = false;
      schedule[i].value = 0;
      schedule[i].barNumber = 0;
      if (!alerted) {
        alerted = true;
        toast.info("Decreased length of bars", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }
  }
  return draftRow;
}

export function wPUpdateDays(oldRow, days) {
  const newRow = produce(oldRow, (draft) => {
    updateDays(draft, days);
    spreadWork(draft);
  });
  return newRow;
}

function updateNumberOfBars(row, numberOfBars) {
  const schedule = row.schedule;
  for (let i = 0; i < schedule.length; i++) {
    schedule[i].value = 0;
    if (i < numberOfBars) {
      schedule[i].start = true;
      schedule[i].end = true;
      schedule[i].status = true;
      schedule[i].barNumber = i + 1;
    } else {
      schedule[i].start = false;
      schedule[i].end = false;
      schedule[i].status = false;
      schedule[i].barNumber = 0;
    }
  }
  spreadWork(row);
  return row;
}

export function spreadWork(row) {
  const days = row.days;
  const schedule = row.schedule;
  const duration = currentCombinedLengthOfBars(row.schedule);
  const Months = Math.floor(days / duration);
  const remainderMonths = days % duration;
  let j = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status) {
      if (j < remainderMonths) {
        schedule[i].value = Months + 1;
        j++;
      } else schedule[i].value = Months;
    }
  }
  return row;
}

export function dAndMUpdateDate(oldRow, date) {
  const newRow = produce(oldRow, (draft) => {
    const schedule = draft.schedule;
    for (let i = 0; i < schedule.length; i++) {
      if (i === date) {
        schedule[i].status = true;
        schedule[i].start = true;
        schedule[i].end = true;
      } else {
        schedule[i].status = false;
        schedule[i].start = false;
        schedule[i].end = false;
      }
    }
  });
  return newRow;
}

export function wPUpdateBlock(oldRow, newValue, oldValue, blockIndex) {
  // console.log(newValue, oldValue, blockIndex);
  const change = newValue - oldValue;
  const newDays = oldRow.days + change;
  const newRow = produce(oldRow, (draft) => {
    draft.days = newDays;
    draft.schedule = oldRow.schedule;
    draft.schedule[blockIndex].value = newValue;
  });
  return newRow;
}

const newTitle = "Rename this title in place...";
export function wPCreateNewRow(scheduleLength, title = newTitle) {
  const newRow = {
    rowId: uuidv4(), // use this but don't send to server
    workPackageTitle: title,
    description: "edit this row in place...",
    days: 1, // default
    dayLoading: "front", // default
    sortPosition: 0, // should sort its self out...
    resources: [], // empty to start with
    schedule: [], // create from project settings
  };
  for (let i = 0; i < scheduleLength; i++) {
    const emptyBlock = {
      status: false,
      start: false,
      end: false,
      barNumber: 0,
      value: 0,
      blockId: "id" + i,
      scheduleIndex: i,
    };
    newRow.schedule.push(emptyBlock);
  }
  newRow.schedule[0].status = true;
  newRow.schedule[0].start = true;
  newRow.schedule[0].end = true;
  newRow.schedule[0].value = 1;
  newRow.schedule[0].barNumber = 1;
  return newRow;
}

export function dAndMCreateNewRow(type, scheduleLength) {
  const newRow = {
    rowId: uuidv4(),
    sortPosition: 0,
    type,
    description: "edit this row in place...",
    schedule: [],
  };
  for (let i = 0; i < scheduleLength; i++) {
    const emptyBlock = {
      status: false,
      start: false,
      end: false,
      blockId: uuidv4(),
      scheduleIndex: 0,
    };
    newRow.schedule.push(emptyBlock);
  }
  newRow.schedule[0].status = true;
  newRow.schedule[0].start = true;
  newRow.schedule[0].end = true;
  return newRow;
}
