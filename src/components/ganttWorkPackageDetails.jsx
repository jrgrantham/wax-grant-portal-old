import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttDetails from "./ganttDetails";
import {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
} from "../state/ganttActionCreators";


function GanttWorkPackage(props) {
  console.log(props.workPackData);
  return (
    <Container>
      <div className="title">
        <h3>workpack title</h3>
      </div>
      {props.workPackData.map((row, index) => {
        return <GanttDetails key={index} row={row} />;
      })}
    </Container>
  );
}

export default connect((state) => state, {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
})(GanttWorkPackage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
