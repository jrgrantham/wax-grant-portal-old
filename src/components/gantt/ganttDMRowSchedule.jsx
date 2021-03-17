import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { dAndMScheduleUpdated } from "../../store/projectData/delsAndMils";
import { MemoisedBlock } from "./ganttDMBlockTrial";

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
      <DragDropContext onDragEnd={handleMovingBlock}>
        <Droppable droppableId={rowId} direction="horizontal">
          {(provided) => (
            <div
              className="blockRow"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {schedule.map(({ blockId, status }, index) => {
                return (
                  <Draggable key={blockId} draggableId={blockId} index={index}>
                    {(provided) => (
                      <div
                        className="MonthContainer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MemoisedBlock
                          // <GanttBlock
                          index={index}
                          status={status}
                          prefix={prefix}
                          rowIndex={rowIndex}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
