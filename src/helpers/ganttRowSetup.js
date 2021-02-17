// import { emptyBlock } from "../data/workPackages";
import { currentCombinedLengthOfBars } from "./index";

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

export function updateNumberOfBars(row, numberOfBars = 3) {
  const schedule = row.schedule;
  console.log("updateNumberOfBars");
  for (let i = 0; i < schedule.length; i++) {
    schedule[i].value = 0;
    if (i < numberOfBars) {
      // console.log("singe, index", i);
      schedule[i].start = true;
      schedule[i].end = true;
      schedule[i].status = true;
      schedule[i].barNumber = i + 1;
    } else {
      // console.log("removed, index", i);
      schedule[i].start = false;
      schedule[i].end = false;
      schedule[i].status = false;
      schedule[i].barNumber = 0;
    }
  }
  spreadWork(row);
  return row;
}
