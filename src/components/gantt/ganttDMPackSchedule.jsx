import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { monthWidth, schedGapColor, wpMarginBottom } from "../../helpers";
// import GanttRowScheduleTrial from "./ganttRowScheduleTrial";
import GanttRowSchedule from "./ganttRowSchedule";

function GanttDMPackSchedule(props) {
  const nonWPPrefix = props.prefix;
  const wpIndex=props.wpIndex
  const projectLength = useSelector(
    (state) => state.project.data.projectLength
  );
  // console.log(props);

  const scheduleWidth =
    projectLength * parseInt(monthWidth.slice(0, -2)) + "px";

  return (
    <Container scheduleWidth={scheduleWidth}>
      <div className="title" />
      {props.workPackData.map((row, index) => {
        return (
          <GanttRowSchedule
            key={index}
            row={row}
            nonWPPrefix={nonWPPrefix}
            rowIndex={index}
            wpIndex={wpIndex}
          />
        );
      })}
      <div className="addButton" />
    </Container>
  );
}

export default GanttDMPackSchedule;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: ${wpMarginBottom} solid ${schedGapColor};
  width: ${(props) => props.scheduleWidth};
  @media screen and (max-width: 750px) {
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
