import React from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// import { wPScheduleUpdated } from "../../store/projectData/workPackages";
// import { dAndMScheduleUpdated } from "../../store/projectData/delsAndMils";
import GanttBar from "./ganttWPBar";
import { leadingZero } from "../../helpers";

function GanttWPRowSchedule(props) {
  const { row, wpIndex, rowIndex } = props;
  const schedule = props.row.schedule;

  const bars = [];
  let newBar = false;
  let currentBar = 0;
  let lastMonth = false;
  let blockCount = 0;
  let blockIndex = 0;

  // let barStartIndex = 0; // right obstruction
  let barEndIndex = schedule.length - 1; // left obst

  // create an array of bars
  // generate obstruction locations during this loop
  for (let i = 0; i < schedule.length; i++) {
    const currentMonth = schedule[i].status;

    if (lastMonth === false && currentMonth === true) {
      newBar = true;
    }

    if (currentMonth) {
      if (newBar === true) {
        bars.push([]);
        bars[currentBar].startIndex = i;
        bars[currentBar].leftObstruction = 0;
        bars[currentBar].rightObstruction = schedule.length;

        // set obstructions
        if (currentBar > 0) {
          bars[currentBar].leftObstruction = barEndIndex + 2;
          bars[currentBar - 1].rightObstruction = i - 1;
        }
        newBar = false;
      }

      let blockNumber = leadingZero(blockIndex);
      if (blockIndex === 0) blockNumber = blockNumber + "s";
      else blockNumber = blockNumber + "m";

      bars[currentBar].push({ value: schedule[i].value, blockNumber });
      blockCount++;
      blockIndex++;
    }

    // at the end of the bar
    if (lastMonth === true && currentMonth === false) {
      const prefix = bars[currentBar][blockIndex - 1].blockNumber.slice(0, 2);
      if (prefix === "00") bars[currentBar][blockIndex - 1].blockNumber = "00x";
      else bars[currentBar][blockIndex - 1].blockNumber = prefix + "e";
      bars[currentBar].blockCount = blockCount;
      barEndIndex = i - 1;
      blockCount = 0;
      blockIndex = 0;
      currentBar++;
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
