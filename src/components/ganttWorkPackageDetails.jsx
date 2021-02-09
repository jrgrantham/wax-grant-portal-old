import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttDetails from "./ganttDetails";

function GanttWorkPackage(props) {
  return (
    <Container backgroundColor={props.backgroundColor}>
      <div className="title">
        <h3>workpack title</h3>
      </div>
      {props.workPackData.map((row, index) => {
        return <GanttDetails key={index} row={row} />;
      })}
      <div className="footer">
        <button>add row</button>
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(GanttWorkPackage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  /* width: 100%; */
  margin-bottom: 10px;
  background-color: white;
  /* border: 1px solid red; */
  border-radius: 6px;
  overflow: hidden;

  .title {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: ${(props) => props.backgroundColor};

  }
  .footer {
    height: 40px;
  }
`