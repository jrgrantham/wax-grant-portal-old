import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { dAndMScheduleUpdated } from "../../store/projectData/delsAndMils";
import GanttDMBlock, { MemoisedBlock } from "./ganttDMBlockTrial";

function GanttDMRowSchedule(props) {
  const { row, prefix, rowIndex } = props;
  const { rowId, schedule } = props.row;
  const dispatch = useDispatch();

  function handleMovingBlock(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    dispatch(dAndMScheduleUpdated({ row, result }));
  }

  return (
    <Container>
      {schedule.map(({ status }, index) => {
        if (status)
          return (
            <GanttDMBlock
              key={index}
              row={row}
              index={index}
              prefix={prefix}
              rowIndex={rowIndex}
              scheduleLength={schedule.length}
            />
          );
      })}
    </Container>
  );
}

export default GanttDMRowSchedule;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 40px;
  .blockRow {
    display: flex;
  }
`;
