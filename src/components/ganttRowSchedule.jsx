import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttBlock from "./ganttBlock";
import { reorderGanttBlocks } from "../state/ganttActionCreators";

function GanttRowSchedule(props) {
  const row = props.row;
  const nonWPPrefix = props.nonWPPrefix;
  const rowIndex = props.rowIndex;
  const { rowId, schedule } = props.row;

  function handleMovingDateBlock(result) {
    if (!result.destination || result.destination.index === result.source.index)
    return;
    const isWP = (row.workPackageTitle !== undefined);
    // console.log(result, row, isWP);
    props.reorderGanttBlocks(result, row, isWP);
  }

  return (
    <Container>
      <DragDropContext onDragEnd={handleMovingDateBlock}>
        <Droppable droppableId={rowId} direction="horizontal">
          {(provided) => (
            <div
              className="chartArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {schedule.map(
                (
                  { blockId, value, status, start, end, color, barNumber },
                  index
                ) => {
                  return (
                    <Draggable
                      key={blockId}
                      draggableId={blockId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="MonthContainer"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <GanttBlock
                            index={index}
                            value={value}
                            status={status}
                            barNumber={barNumber}
                            start={start ? 1 : 0}
                            end={end ? 1 : 0}
                            color={color}
                            nonWPPrefix={nonWPPrefix}
                            rowIndex={rowIndex}
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
})(GanttRowSchedule);

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  /* width: 100%; */

  .chartArea {
    display: flex;
  }
`;
