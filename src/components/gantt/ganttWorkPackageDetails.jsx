import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttDetails from "./ganttDetails";

function GanttWorkPackage(props) {
  const isWP = !(props.title === 'Deliverables' || props.title === 'Milestones')
  return (
    <Container backgroundColor={props.backgroundColor}>
      <div className="title">
        <h3>{props.title}</h3>
      </div>
      {props.workPackData.map((row, index) => {
        return <GanttDetails key={index} row={row} isWP={isWP}/>;
      })}
      <div className="footer">
        <button>add row</button>
      </div>
    </Container>
  );
}

export default (GanttWorkPackage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background-color: white;
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
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 5px;
  }
`;
