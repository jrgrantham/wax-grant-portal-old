export function currentCombinedLengthOfBars(schedule) {
  let length = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].status) {
      length++
    }
  }
  return length
}

export function getFirstAndLastDateOfBar(barNumber, schedule) {
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

// export function getLastDateOfSchedule(schedule) {
//   console.log('last date');
//   const endOfSchedule = schedule.length - 1
//   for (let i=endOfSchedule; i>0; i--) {
//     if (schedule[i].status === true) return i
//   } 
// }