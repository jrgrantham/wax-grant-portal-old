import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import GanttSchedule from "../components/ganttSchedule";
import {
  reorderGanttRows,
  evenlySpreadWork,
} from "../state/ganttActionCreators";

function GanttChart(props) {
  const ganttEntries = props.ganttEntries.data;

  // function handleDragRow(result) {
  //   if (!result.destination) return;
  //   props.reorderGanttRows(result, ganttEntries);
  // }

  function handleSpreadingWork(schedule) {
    props.evenlySpreadWork(schedule);
  }

  return (
    <Container>
      Gantt Chart
      <div className="chartArea">
        <div className="descriptionContainer">
          <div className="descriptionContainer">
            {props.ganttEntries.data.map((row, index) => {
              const { description, resources, days } = row;
              return (
                <div className="MonthContainer" key={index}>
                  <div className="ganttRow">
                    <h2>X</h2>
                    <h5>{description}</h5>
                    <h5>{resources}</h5>
                    <h5>{days}</h5>
                    <button onClick={() => handleSpreadingWork(row)}>
                      ...hours
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="scheduleContainer">
          {ganttEntries.map((row, index) => {
            // row might not be required
            return (
              <div key={index} className="ganttRow">
                <GanttSchedule ganttRowIndex={index} row={row} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  reorderGanttRows,
  evenlySpreadWork,
})(GanttChart);

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
