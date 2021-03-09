import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { wPScheduleUpdated } from "../../store/projectData/workPackages";
import { dAndMScheduleUpdated } from "../../store/projectData/delsAndMils";
import { MemoisedBar } from "./ganttBarTrial";

function GanttRowScheduleTrial(props) {
  const row = props.row;
  const nonWPPrefix = props.nonWPPrefix;
  const rowIndex = props.rowIndex;
  const { rowId, schedule } = props.row;
  const dispatch = useDispatch();
  const isWP = row.workPackageTitle !== undefined;
  const wpIndex = 0;

  return (
    <Container>
      <MemoisedBar rowIndex={rowIndex} wpIndex={wpIndex} barNumber={1}/>
    </Container>
  );
}

export default GanttRowScheduleTrial;

const Container = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  width: 500px;
  /* border: 1px solid red; */
  .blockRow {
    display: flex;
  }
`;
