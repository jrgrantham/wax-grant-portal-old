import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "./ganttPackStyling";

import {
  wPReorderRows,
  wPRowAdded,
  wPTitleChanged,
} from "../../store/projectData/workPackages";
import GanttDetails from "./ganttRowWork";
import { dAndMReorderRows } from "../../store/projectData/delsAndMils";
import EditModal from "./ganttModalEdit";
import { wpBackground } from "../../helpers";

function GanttPackWork(props) {
  const title = props.title;
  const packData = props.workPackData;
  const dispatch = useDispatch();
  const isWP = !(title === "Deliverables" || title === "Milestones");
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const { projectLength } = useSelector((state) => state.project.data);
  function handleAddNewRow() {
    dispatch(wPRowAdded({ projectLength, title }));
  }

  function calculateDays() {
    let days = 0;
    packData.forEach((row) => {
      days += row.days;
    });
    return days;
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const row = packData[result.source.index];
    if (isWP) dispatch(wPReorderRows({ row, movement }));
    else dispatch(dAndMReorderRows({ rowId: row.rowId, movement }));
  }

  function handleEditTitle(value) {
    if (value === "Deliverables" || title === "Milestones") return;
    console.log(value);
    setEditTitle(value);
  }

  function sendEditedTitle() {
    dispatch(wPTitleChanged({ oldTitle: title, newTitle: editTitle }));
  }

  return (
    <Container titleBarColor={props.titleBarColor} wpBackground={wpBackground}>
      {edit ? <EditModal setEdit={setEdit} /> : null}
      <div className="titleBar">
        <input
          className="title"
          type="text"
          value={editTitle}
          onChange={(e) => handleEditTitle(e.target.value)}
          onBlur={sendEditedTitle}
        />
        <div className="info">
          <h3 className="resources">Resources</h3>
          <h3 className="days">Days</h3>
        </div>
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
                        <GanttDetails
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
                <p className="days">{calculateDays()}</p>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackWork;