import { emptyBlock } from "../data/data";

export function spreadWork(row) {
  // spread over bars
  // spread even front or back
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

export function setNumberOfBars(row, numberOfBars = 1) {
  const newSchedule = []; // of length determined by settings
  const scheduleLength = 20; // to come from project setup
  for (let i = 0; i < scheduleLength; i++) {
    newSchedule.push({...emptyBlock});
  }
}
