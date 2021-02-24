// import { emptyBlock } from "../data/workPackages";
import produce from "immer";
import { currentCombinedLengthOfBars } from "./index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export function updateEditedWp(oldRow, changes) {
  const {
    newWorkPackageTitle,
    newDescription,
    newDayLoading,
    newDays,
    newBars,
  } = changes;

  const newRow = produce(oldRow, (draft) => {
    if (newWorkPackageTitle) draft.workPackageTitle = newWorkPackageTitle;
    if (newDescription) draft.description = newDescription;
    if (newDayLoading) draft.datLoading = newDayLoading;
    if (newDays) {
      draft.days = newDays;
      spreadWork(draft);
    }

    // if days are reducing below the length of the bar, reduce the bar

    let bars = newBars;
    if (newBars) {
      if (newBars > draft.days) {
        bars = draft.days;
        toast.info("bar length cannot exceed assigned days", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
      updateNumberOfBars(draft, bars);
    }
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

export function wPUpdateDays(oldRow, days) {
  const newRow = produce(oldRow, (draft) => {
    let alerted = false;
    draft.days = days;
    const schedule = draft.schedule;
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
          toast.info("decreased length of bars", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      }
    }
    spreadWork(draft);
  });
  return newRow;
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
  console.log(newValue, oldValue, blockIndex);
  const change = newValue - oldValue;
  const newDays = oldRow.days + change;
  const newRow = produce(oldRow, (draft) => {
    draft.days = newDays;
    draft.schedule = oldRow.schedule;
    draft.schedule[blockIndex].value = newValue;
  });
  return newRow;
}
