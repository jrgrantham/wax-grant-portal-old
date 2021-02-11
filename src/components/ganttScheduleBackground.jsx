import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// needs adding to state
import { project } from "../data/index";

function GanttScheduleBackground(props) {
  const classNames = [
    "backgroundColumn columnLeft",
    "backgroundColumn",
    "backgroundColumn columnRight",
  ];
  const columns = [];
  for (let i = 0; i < project.data.projectLength; i++) {
    columns.push(<div key={i} className={classNames[i % 3]}></div>);
  }
  return <Container>{columns}</Container>;
}

export default connect((state) => state, {})(GanttScheduleBackground);

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  .backgroundColumn {
    height: 100%;
    width: 40px;
    background-color: rgba(100, 100, 100, 0.1);
    border-left: 1px solid rgba(100, 100, 100, 0.1);
    border-right: 1px solid rgba(100, 100, 100, 0.1);
  }
  .columnLeft {
    border-left: 1px solid white;
  }
  .columnRight {
    border-right: 1px solid white;
  }
`;
