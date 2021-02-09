import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttRowSchedule from "./ganttRowSchedule";
function GanttWorkPackageSchedule(props) {
  return (
    <Container backgroundColor={props.backgroundColor}>
      <div className="title" />
      {props.workPackData.map((row, index) => {
        return <GanttRowSchedule key={index} ganttRowIndex={index} row={row} />;
      })}
      <div className="footer" />
    </Container>
  );
}

export default connect((state) => state, {})(GanttWorkPackageSchedule);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  margin-bottom: 10px;
  /* background-color: white; */
  /* border: 1px solid red; */
  
  .title {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: transparent;

  }
  .footer {
    height: 40px;
  }
`;
