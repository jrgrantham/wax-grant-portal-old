import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttWorkPackageDetails from "../components/ganttWorkPackageDetails";
import GanttWorkPackageSchedule from "../components/ganttWorkPackageSchedule";
import {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
} from "../state/ganttActionCreators";

function GanttChart(props) {
  // const [modalOpen, setModalOpen] = useState(false);
  return (
    <Container>
      <h1>Gantt Chart</h1>
      <div className="chartArea">
        <div className="left">
          <GanttWorkPackageDetails />
          <GanttWorkPackageDetails />
        </div>
        <div className="right">
          <GanttWorkPackageSchedule />
          <GanttWorkPackageSchedule />
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
})(GanttChart);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .chartArea {
    display: flex;
    width: 100%;
  }
  .left {
  }
  .right {
    overflow-x: scroll;
  }
`;
