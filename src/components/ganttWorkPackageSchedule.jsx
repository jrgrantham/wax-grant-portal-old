import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "react-modal";

// import { FiClock } from "react-icons/fi";
// import GanttRowSchedule from "../components/GanttRowSchedule";
import GanttRowSchedule from "./ganttRowSchedule";
import {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
} from "../state/ganttActionCreators";

Modal.setAppElement("#root");

function GanttWorkPackageSchedule(props) {
  console.log(props.workPackData);
  return (
    <Container>
      <div className="title">
        <h3>workpack title</h3>
      </div>
      {props.workPackData.map((row, index) => {
        return <GanttRowSchedule key={index} ganttRowIndex={index} row={row} />;
      })}
    </Container>
  );
}

export default connect((state) => state, {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
})(GanttWorkPackageSchedule);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
