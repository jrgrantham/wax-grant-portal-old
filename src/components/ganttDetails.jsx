import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
} from "../state/ganttActionCreators";

function GanttDetails(props) {
  const row = props.row;
  const { description, resources, days, schedule } = row;
  return (
    <Container>
      <button onClick={() => props.setNumberOfBars(schedule)}>bars</button>
      <button onClick={() => props.evenlySpreadWork(row)}>
        <FiClock />
      </button>
      <button onClick={() => console.log(row)}>test</button>
      <h2>X</h2>
      <h5>{description}</h5>
      <h5>{resources}</h5>
      <h5>{days}</h5>
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 50px;
`;

export default connect((state) => state, {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
})(GanttDetails);
