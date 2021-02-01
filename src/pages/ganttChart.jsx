import React from "react";
import styled from "styled-components";
import GanttBlocks from "../components/ganttBlocks";

function GanttChart() {
  const blockWidth = "40px";
  const rowHeight = "40px";

  return (
    <Container>
      Gantt Chart
      <div className="ganttRow">
        <GanttBlocks />
      </div>
    </Container>
  );
}
export default GanttChart;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .chartArea {
    display: flex;
  }
  button {
    margin: 4px 5px;
    cursor: pointer;
  }
`;
