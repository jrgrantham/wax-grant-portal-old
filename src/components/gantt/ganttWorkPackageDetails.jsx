import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  wPReorderRows,
  wPRowAdded,
  wPTitleChanged,
} from "../../store/projectData/workPackages";
import GanttDetails from "./ganttRowDetails";
import { dAndMReorderRows } from "../../store/projectData/delsAndMils";
import EditModal from "./ganttEditModal";

function GanttWorkPackage(props) {
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
    dispatch(wPTitleChanged({oldTitle: title, newTitle: editTitle}))
  }

  return (
    <Container backgroundColor={props.backgroundColor}>
      {edit ? <EditModal setEdit={setEdit} /> : null}
      <div className="titleBar">
        {isWP ? (
          <>
            <input
              className="title"
              type="text"
              value={editTitle}
              onChange={(e) => handleEditTitle(e.target.value)}
              onBlur={sendEditedTitle}
            />
            <div className="info">
              <h3 className="resources">Resources</h3>
              <h3>Days</h3>
            </div>
          </>
        ) : <h3>{title}</h3>}
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
                {isWP ? <p>{calculateDays()}</p> : null}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default GanttWorkPackage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;

  .titleBar {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 500px;
    padding-left: 25px;
    padding-right: 31px;
    background-color: ${(props) => props.backgroundColor};
    .title {
      width: 280px;
      background-color: transparent;
      border-color: transparent;
      color: white;
      font-size: 16px;
      font-weight: 800;
      &:hover {
        border-color: #a1a1a1;
      }
      &:focus {
        border-color: #a1a1a1;
      }
    }
    .info {
      display: flex;
    }
    .resources {
      margin-right: 26px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-left: 30px;
    padding-right: 31px;
    p {
      font-weight: 700;
    }
  }
`;
