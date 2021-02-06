import { emptyBlock } from "../data/data";
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
}

function setNumberOfBars(row, numberOfBars = 1) {
  const newSchedule = []; // of length determined by settings
  const scheduleLength = 20; // to come from project setup
  for (let i = 0; i < scheduleLength; i++) {
    newSchedule.push({ ...emptyBlock });
  }
}
