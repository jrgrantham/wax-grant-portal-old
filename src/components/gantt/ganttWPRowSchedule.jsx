import React from "react";
import styled from "styled-components";

import GanttBar from "./ganttWPBar";
import { leadingZero } from "../../helpers";

function GanttWPRowSchedule(props) {
  const { row, wpIndex, rowIndex } = props;
  const schedule = props.row.schedule;

  const bars = [];
  let newBar = false;
  let currentBarIndex = 0;
  let lastMonth = false;
  let blockCount = 0;
  let blockIndex = 0;
  let barEndIndex = 0; // left obstruction

  // let barStartIndex = 0; // right obstruction

  // create an array of bars
  // generate obstruction locations during this loop
  for (let i = 0; i < schedule.length; i++) {
    const currentMonth = schedule[i].status;

    if (lastMonth === false && currentMonth === true) {
      newBar = true;
    }

    if (currentMonth) {
      if (newBar === true) {
        // initiate bar
        bars.push([]);
        bars[currentBarIndex].startIndex = i;
        bars[currentBarIndex].leftObstruction = 0;
        bars[currentBarIndex].rightObstruction = schedule.length;

        // set obstructions
        if (currentBarIndex > 0) {
          bars[currentBarIndex].leftObstruction = barEndIndex + 2;
          bars[currentBarIndex - 1].rightObstruction = i - 1;
        }
        newBar = false;
      }

      // append start or middle
      let blockNumber = leadingZero(blockIndex);
      if (blockIndex === 0) blockNumber = blockNumber + "s";
      else blockNumber = blockNumber + "m";

      bars[currentBarIndex].push({ value: schedule[i].value, blockNumber });
      blockCount++;
      blockIndex++;
    }
    // at the end of the bar
    const endOfSched = currentMonth && i === schedule.length - 1;
    const endOfBar = lastMonth === true && currentMonth === false
    if (endOfBar || endOfSched) {
      // if (lastMonth === true && currentMonth === false || i === schedule.length - 1) {
      const prefix = bars[currentBarIndex][blockIndex - 1].blockNumber.slice(
        0,
        2
      );
      if (prefix === "00")
        bars[currentBarIndex][blockIndex - 1].blockNumber = "00x";
      else bars[currentBarIndex][blockIndex - 1].blockNumber = prefix + "e";
      bars[currentBarIndex].blockCount = blockCount;
      barEndIndex = i - 1;
      blockCount = 0;
      blockIndex = 0;
      currentBarIndex++;
    }
    lastMonth = currentMonth;
  }

  return (
    <Container>
      {bars.map((bar, index) => {
        return (
          <GanttBar
            key={index}
            row={row}
            wpIndex={wpIndex}
            rowIndex={rowIndex}
            barNumber={index}
            bar={bar}
          />
        );
      })}
    </Container>
  );
}

export default GanttWPRowSchedule;

const Container = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  width: 500px;
  /* border: 1px solid red; */
  .blockRow {
    display: flex;
  }
`;
