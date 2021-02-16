import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { reorderWorkPackageRows } from "../../store/projectData/workPackageActionCreators";

import GanttDetails from "./ganttDetails";

function GanttWorkPackage(props) {
  const isWP = !(
    props.title === "Deliverables" || props.title === "Milestones"
  );

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const row = props.workPackData[result.source.index];
    if (isWP) props.reorderWorkPackageRows(row, movement);
  }

  return (
    <Container backgroundColor={props.backgroundColor}>
      <div className="title">
        <h3>{props.title}</h3>
      </div>
      <DragDropContext onDragEnd={handleMovingRow}>
        <Droppable droppableId={props.title}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {props.workPackData.map((row, index) => {
                return (
                  <Draggable
                    key={row.rowId}
                    draggableId={row.rowId}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="MonthContainer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <GanttDetails key={index} row={row} isWP={isWP} />
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
      {/* <div className="footer">
        <button>add row</button>
      </div> */}
    </Container>
  );
}

export default connect((state) => state, {
  reorderWorkPackageRows,
})(GanttWorkPackage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;

  .title {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: ${(props) => props.backgroundColor};
  }
  .footer {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 5px;
  }
`;
