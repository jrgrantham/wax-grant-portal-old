import React from "react";
import styled from "styled-components";

import GanttDMBlock from "./ganttDMBlock";

function GanttDMRowSchedule(props) {
  const { row, prefix, rowIndex } = props;
  const schedule = props.row.schedule;

  return (
    <Container>
      {schedule.map(({ status }, index) => {
        if (status)
          return (
            <GanttDMBlock
              key={index}
              row={row}
              index={index}
              prefix={prefix}
              rowIndex={rowIndex}
              scheduleLength={schedule.length}
            />
          );
      })}
    </Container>
  );
}

export default GanttDMRowSchedule;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 40px;
  .blockRow {
    display: flex;
  }
`;
