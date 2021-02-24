import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  wPReorderRows,
  wPRowAdded,
} from "../../store/projectData/workPackages";
import GanttDetails from "./ganttRowDetails";
import { dAndMReorderRows } from "../../store/projectData/delsAndMils";
import EditModal from "./ganttEditModal";

function GanttWorkPackage(props) {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const packData = props.workPackData;
  const title = props.title;
  const isWP = !(title === "Deliverables" || title === "Milestones");

  const { projectLength } = useSelector((state) => state.project.data);
  function handleAddNewRow() {
    dispatch(wPRowAdded({projectLength, title}));
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

  return (
    <Container backgroundColor={props.backgroundColor}>
      {edit ? <EditModal setEdit={setEdit} /> : null}
      <div className="title">
        <h3>{title}</h3>
        {isWP ? (
          <div className="info">
            <h3 className="resources">Resources</h3>
            <h3>Days</h3>
          </div>
        ) : null}
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
              <div className="addButton">
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

  .title {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 500px;
    padding-left: 25px;
    padding-right: 19px;
    background-color: ${(props) => props.backgroundColor};
    .info {
      display: flex;
    }
    .resources {
      margin-right: 15px;
    }
  }
  .addButton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-left: 25px;
    padding-right: 27px;
    p {
      font-weight: 700;
    }
  }
`;
