import { currentCombinedLengthOfBars, getFirstAndLastDateOfBar } from "./index";

export function reorderItems(array, result) {
  // const items = Array.from(array);
  const [item] = array.splice(result.source.index, 1);
  array.splice(result.destination.index, 0, item);
  return array;
}

export function handleReorderGanttBlocks(schedule, result, days) {
  // console.log("handleReorderGanttBlocks", schedule, result);
  const originalBlockDate = result.source.index;
  const newBlockDate = result.destination.index;
  const blockContents = schedule[originalBlockDate];

  if (barsOverlap(originalBlockDate, newBlockDate, schedule)) {
    console.log("collision");
    return;
  }
  if (barIsIncreasing(originalBlockDate, newBlockDate, blockContents)) {
    console.log("true");
  }

  const [barStart, barEnd] = getFirstAndLastDateOfBar(
    blockContents.barNumber,
    schedule
  );

  if (blockContents.start && blockContents.end) {
    splitSingleEntry(originalBlockDate, newBlockDate, schedule);
  } else if (blockContents.start && newBlockDate >= barEnd) {
    createSingleEntry(barEnd, barStart, schedule);
  } else if (blockContents.end && newBlockDate <= barStart) {
    createSingleEntry(barStart, barEnd, schedule);
  } else {
    reorderItems(schedule, result);
    setPropertiesByFirstAndLast(schedule);
    currentCombinedLengthOfBars(schedule);
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
    if (schedule[j].barNumber !== barNumber && schedule[j].barNumber !== 0) {
      // console.log("collision");
      return true;
    }
  }
  // console.log('loops complete, no collision');
  return false;
}

function barIsIncreasing(originalBlockDate, newBlockDate, blockContents) {
  return (
    (blockContents.start && newBlockDate < originalBlockDate) ||
      (blockContents.end && newBlockDate > originalBlockDate)
  );
}

function checkBarLongerThanDays(days) {
  console.log(days);
}

function newLengthOfCombinedBars() {}

function createSingleEntry(dateForNewBlock, otherDate, schedule) {
  // console.log("createSingleEntry");
  const firstDate = Math.min(dateForNewBlock, otherDate);
  const lastDate = Math.max(dateForNewBlock, otherDate);

  // console.log(firstDate, lastDate);

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
  setPropertiesByFirstAndLast(schedule);
}

function setPropertiesByFirstAndLast(schedule) {
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
    if (schedule[i].status === false) {
      schedule[i].value = 0;
    }
  }
}
