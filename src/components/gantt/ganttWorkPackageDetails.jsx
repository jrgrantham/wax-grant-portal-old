import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { wPReorderRows } from "../../store/projectData/workPackages";
import GanttDetails from "./ganttDetails";
import { dAndMReorderRows } from "../../store/projectData/delsAndMils";

function GanttWorkPackage(props) {
  const dispatch = useDispatch();
  const packData = props.workPackData;
  const isWP = !(
    props.title === "Deliverables" || props.title === "Milestones"
  );

  function calculateHours() {
    let days = 0;
    packData.forEach((row) => {
      days += row.days;
    });
    return days;
  }
  // const totalDays = calculateHours()
  // console.log(totalDays)

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
      <div className="title">
        <h3>{props.title}</h3>
        {isWP ? (
          <div className="info">
            <h3 className="resources">Resources</h3>
            <h3>Days</h3>
          </div>
        ) : null}
      </div>
      <DragDropContext onDragEnd={handleMovingRow}>
        <Droppable droppableId={props.title}>
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
                <button>add task</button>
                {isWP ? <p>{calculateHours()}</p> : null}
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
