import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import GanttRowSchedule from "./ganttRowSchedule";
function GanttWorkPackageSchedule(props) {
  const nonWPPrefix = props.prefix;
  const scheduleWidth = useSelector(state => state.project.data.projectLength)

  return (
    <Container columns={scheduleWidth}>
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
      <div className="addButton" />
    </Container>
  );
}

export default GanttWorkPackageSchedule;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 10px; */
  border-bottom: 10px solid rgba(250, 250, 250, 0.25);
  width: ${props => props.columns * 40}px;
  @media screen and (max-width: 720px) {
        border-bottom: 0;
      }

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .addButton {
    height: 40px;
  }
`;
