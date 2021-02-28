import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import GanttRowDelsMils from "./ganttRowDelsMils";
import { dAndMReorderRows } from "../../store/projectData/delsAndMils";
import { wpBackground } from "../../helpers";

import { Container } from "./ganttPackStyling";

function GanttPackDelsMils(props) {
  const title = props.title;
  const packData = props.workPackData;
  const dispatch = useDispatch();
  const isWP = !(title === "Deliverables" || title === "Milestones");

  const { projectLength } = useSelector((state) => state.project.data); // needed for new row

  function handleAddNewRow() {
    // dispatch(wPRowAdded({ projectLength, title }));
    // need add row function for dels and mils
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const row = packData[result.source.index];
    dispatch(dAndMReorderRows({ rowId: row.rowId, movement }));
  }

  return (
    <Container titleBarColor={props.titleBarColor} wpBackground={wpBackground}>
      <div className="titleBar">
        <h3 className="notInput">{title}</h3>
      </div>
      <DragDropContext onDragEnd={handleMovingRow}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {packData.map((row, index) => {
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
                      >
                        <GanttRowDelsMils
                          provided={provided}
                          key={index}
                          row={row}
                          isWP={isWP}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className="bottom">
                <button onClick={handleAddNewRow}>add task</button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackDelsMils;
