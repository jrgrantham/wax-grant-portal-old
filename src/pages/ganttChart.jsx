import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import GanttSchedule from "../components/ganttSchedule";
import {
  reorderGanttRows,
  evenlySpreadWork,
} from "../state/ganttActionCreators";

function GanttChart(props) {
  return (
    <Container>
      Gantt Chart
      <div className="entireChart">
        <div className="detailsSection">
          {props.ganttEntries.data.map((row, index) => {
            const { description, resources, days } = row;
            return (
              <div className="ganttRow details" key={index}>
                <h2>X</h2>
                <h5>{description}</h5>
                <h5>{resources}</h5>
                <h5>{days}</h5>
                <button onClick={() => props.evenlySpreadWork(row)}>
                  <FiClock />
                </button>
              </div>
            );
          })}
        </div>
        <div className="scheduleSection">
          {props.ganttEntries.data.map((row, index) => {
            return (
              <div key={index} className="ganttRow schedule">
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

  .entireChart {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .detailsSection {
    display: flex;
    flex-direction: column;
  }
  .scheduleSection {
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    margin-right: 20px;
  }
  .ganttRow {
    display: flex;
    align-items: center;
    height: 50px;
  }
  .details {
    width: 100px;
    display: flex;
    justify-content: space-between;
  }
.schedule {

}
  button {
    padding: 4px 5px;
    cursor: pointer;
  }
`;
