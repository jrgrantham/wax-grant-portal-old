import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { wPScheduleUpdated } from "../../store/projectData/workPackages";
import { dAndMScheduleUpdated } from "../../store/projectData/delsAndMils";
import { MemoisedBlock } from "./ganttBlock";

function GanttRowSchedule(props) {
  const row = props.row;
  const nonWPPrefix = props.nonWPPrefix;
  const rowIndex = props.rowIndex;
  const { rowId, schedule } = props.row;
  const dispatch = useDispatch();
  const isWP = row.workPackageTitle !== undefined;

  function handleMovingBlock(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    if (isWP) dispatch(wPScheduleUpdated({ row, result }));
    else {
      dispatch(dAndMScheduleUpdated({ row, result }));
    }
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
                          <MemoisedBlock
                            // <GanttBlock
                            index={index}
                            value={value}
                            status={status}
                            barNumber={barNumber}
                            start={start ? 1 : 0}
                            end={end ? 1 : 0}
                            color={color}
                            nonWPPrefix={nonWPPrefix}
                            rowIndex={rowIndex}
                            rowId={rowId}
                            row={row}
                            isWP={isWP}
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

export default GanttRowSchedule;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  /* width: 100%; */

  .blockRow {
    display: flex;
  }
`;
