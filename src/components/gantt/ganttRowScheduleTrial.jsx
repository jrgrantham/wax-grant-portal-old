import React from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// import { wPScheduleUpdated } from "../../store/projectData/workPackages";
// import { dAndMScheduleUpdated } from "../../store/projectData/delsAndMils";
import { MemoisedBar } from "./ganttWPBar";
import { leadingZero } from "../../helpers";

function GanttRowScheduleTrial(props) {
  const row = props.row;
  const wpIndex = props.wpIndex;
  const rowIndex = props.rowIndex;
  const schedule = props.row.schedule;

  const bars = [];
  let newBar = false;
  let currentBar = 0;
  let lastMonth = false;
  let barLength = 0; // might not be used
  let blockIndex = 0;

  // create an array of bars
  // generate obstruction locations during this loop
  for (let i = 0; i < schedule.length; i++) {
    const currentMonth = schedule[i].status;
    const currentValue = schedule[i].value;
    if (lastMonth === false && currentMonth === true) {
      newBar = true;
    }
    if (currentMonth) {
      if (newBar === true) {
        bars.push([]);
        bars[currentBar].startIndex = i;
        newBar = false;
      }
      let blockNumber = leadingZero(blockIndex);
      if (blockIndex === 0) blockNumber = blockNumber + "s";
      else blockNumber = blockNumber + "m";
      // bars[currentBar].push({ index: i, value: currentValue });
      bars[currentBar].push({ value: currentValue, blockNumber });
      barLength++;
      blockIndex++;
    }

    // at the end of the bar
    if (lastMonth === true && currentMonth === false) {
      const prefix = bars[currentBar][blockIndex - 1].blockNumber.slice(0, 2);
      if (prefix === "00") bars[currentBar][blockIndex - 1].blockNumber = "00x";
      else bars[currentBar][blockIndex - 1].blockNumber = prefix + "e";
      bars[currentBar].barLength = barLength;
      currentBar++;
      barLength = 0;
      blockIndex = 0;
    }
    lastMonth = currentMonth;
  }

  return (
    <Container>
      {bars.map((bar, index) => {
        return (
          <MemoisedBar
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

export default GanttRowScheduleTrial;

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
