// import { emptyBlock } from "../data/tasks";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentCombinedLengthOfBars } from "./index";
import { toastDelay } from "./settings";

toast.configure();

export function updateEditedWp(oldRow, changes) {
  const {
    newWorkPackageTitle,
    newDescription,
    newDayLoading,
    newDays,
    newBars,
    reset,
  } = changes;

  const newRow = produce(oldRow, (draft) => {
    if (newWorkPackageTitle) draft.workPackageTitle = newWorkPackageTitle;
    if (newDescription) draft.description = newDescription;
    if (newDayLoading) draft.dayLoading = newDayLoading;
    if (newDays) {
      updateDays(draft, newDays, reset);
      spreadWork(draft);
    }
    let bars = newBars;
    if (newBars) {
      if (newBars > draft.days) {
        bars = draft.days;
        toast.info("Bars limited to number of days", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: toastDelay,
        });
      }
      updateNumberOfBars(draft, bars);
    }
  });
  return newRow;
}

function updateDays(draftRow, days, reset) {
  let alerted = false;
  draftRow.days = days;
  const schedule = draftRow.schedule;
  let statusCount = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status) statusCount++;
    if (statusCount > days) {
      schedule[i].status = false;
      schedule[i].value = 0;
      schedule[i].barNumber = 0;
      if (!alerted && !reset) {
        alerted = true;
        toast.info("Decreased length of bars", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: toastDelay,
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

function updateNumberOfBars(task, numberOfBars) {
  const schedule = task.schedule;
  let barNumber = 1;
  for (let i = 0; i < schedule.length - 1; i = i + 2) {
    schedule[i].value = 0;
    if (barNumber <= numberOfBars) {
      schedule[i].status = true;
      schedule[i].barNumber = barNumber;
      barNumber++;
      schedule[i + 1].status = false;
      schedule[i + 1].barNumber = 0;
    } else {
      schedule[i].status = false;
      schedule[i].barNumber = 0;
      schedule[i + 1].status = false;
      schedule[i + 1].barNumber = 0;
    }
  }
  spreadWork(task);
  return task;
}

export function spreadWork(task) {
  const days = task.days;
  const schedule = task.schedule;
  const duration = currentCombinedLengthOfBars(task.schedule);
  const Months = Math.floor(days / duration);
  const remainderMonths = days % duration;
  let j = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status) {
      if (j < remainderMonths) {
        schedule[i].value = Months + 1;
        j++;
      } else schedule[i].value = Months;
    } else schedule[i].value = 0;
  }
  return task;
}

export function wPUpdateBlock(oldRow, newValue, oldValue, blockIndex) {
  const change = newValue - oldValue;
  const newDays = oldRow.days + change;
  const newRow = produce(oldRow, (draft) => {
    draft.days = newDays;
    draft.schedule = oldRow.schedule;
    draft.schedule[blockIndex].value = newValue;
  });
  return newRow;
}

const newTitle = "Work Package Title";
export function wPCreateNewRow(scheduleLength, title = newTitle) {
  const newRow = {
    taskId: uuidv4(), // use this but don't send to server
    workPackageTitle: title,
    description: "Task Name",
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
  newRow.schedule[0].value = 1;
  newRow.schedule[0].barNumber = 1;
  return newRow;
}

export function dAndMCreateNewRow(type, scheduleLength) {
  const newRow = {
    taskId: uuidv4(),
    sortPosition: 0,
    type,
    description: "Deadline description",
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
  return newRow;
}
