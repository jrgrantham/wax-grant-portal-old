import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttBlock from "./ganttBlock";
import {
  reorderGanttBlocks,
  evenlySpreadWork,
} from "../state/ganttActionCreators";

function GanttSchedule(props) {
  const row = props.row
  const { rowId, schedule } = props.row;

  function handleSpreadingWork() {
    props.evenlySpreadWork(rowId);
  }

  function handleMovingMonth(result) {
    if (!result.destination) return;
    props.reorderGanttBlocks(result, row);
  }

  return (
    <Container>
      <button onClick={handleSpreadingWork}>...hours</button>
      <DragDropContext onDragEnd={handleMovingMonth}>
        <Droppable droppableId={rowId} direction="horizontal">
          {(provided) => (
            <div
              className="chartArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {schedule.map(
                ({ blockId, value, status, start, end, color }, index) => {
                  return (
                    <Draggable key={blockId} draggableId={blockId} index={index}>
                      {(provided) => (
                        <div
                          className="MonthContainer"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <GanttBlock
                            value={value}
                            status={status}
                            start={start ? 1 : 0}
                            end={end ? 1 : 0}
                            color={color}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                }
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default connect((state) => state, {
  reorderGanttBlocks,
  evenlySpreadWork,
})(GanttSchedule);

const Container = styled.div`
  display: flex;

  .chartArea {
    display: flex;
  }
  button {
    margin: 4px 5px;
    cursor: pointer;
  }
`;
