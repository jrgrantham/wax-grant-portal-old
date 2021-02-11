import React from "react";
// import { connect } from "react-redux";
import styled from "styled-components";

import GanttRowSchedule from "./ganttRowSchedule";
function GanttWorkPackageSchedule(props) {
  const nonWPPrefix = props.prefix;

  return (
    <Container backgroundColor={props.backgroundColor}>
      <div className="title" />
      {props.workPackData.map((row, index) => {
        return (
          <GanttRowSchedule
            key={index}
            ganttRowIndex={index}
            row={row}
            nonWPPrefix={nonWPPrefix}
            rowIndex={index}
          />
        );
      })}
      <div className="footer" />
    </Container>
  );
}

export default GanttWorkPackageSchedule;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .footer {
    height: 40px;
  }
`;
