import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import GanttSchedule from "../components/ganttSchedule";
import { reorderGanttRow } from "../state/ganttActionCreators";

function GanttChart(props) {
  function handleDragRow(result) {
    if (!result.destination) return;
    props.reorderGanttRow(result);
  }
console.log(props);
  return (
    <Container>
      Gantt Chart
      <div className="chartArea">
        <div className="descriptionContainer">
          <DragDropContext onDragEnd={handleDragRow}>
            <Droppable droppableId={"sectionId"} direction="vertical">
              {(provided) => (
                <div
                  className="descriptionContainer"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {props.ganttEntries.data.map(
                    ({ id, description, resources, days }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <div
                              className="MonthContainer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="ganttRow">
                                <h2>X</h2>
                                <h5>{description}</h5>
                                <h5>{resources}</h5>
                                <h5>{days}</h5>
                              </div>
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
        </div>
        <div className="scheduleContainer">
          {props.ganttEntries.data.map((row, index) => {  // row might not be required
            return (
              <div key={index} className="ganttRow">
                <GanttSchedule ganttEntryIndex={index} row={row}/>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, { reorderGanttRow })(GanttChart);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .chartArea {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .ganttRow {
    display: flex;
    align-items: center;
    height: 50px;
  }
  .descriptionContainer {
    display: flex;
    flex-direction: column;
  }
  .scheduleContainer {
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    margin-right: 20px;
  }

  button {
    margin: 4px 5px;
    cursor: pointer;
  }
`;
