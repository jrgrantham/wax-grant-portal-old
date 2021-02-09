import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "react-modal";

// import { FiClock } from "react-icons/fi";
import GanttRowSchedule from "./ganttRowSchedule";
import GanttDetails from "./ganttDetails";
import {
  reorderGanttRows,
  evenlySpreadWork,
  setNumberOfBars,
} from "../state/ganttActionCreators";

Modal.setAppElement("#root");

function GanttWorkPackage(props) {
  // const [modalOpen, setModalOpen] = useState(false);
  return (
    <Container>
      <div className="title">
        <h3>workpack title</h3>
      </div>
      {props.workPackages.data.map((row, index) => {
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

  .right {
    overflow-x: scroll;
  }

  .entireChart {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .section {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
  }
  .schedule {
    margin: 0 20px;
  }
  .display {
    margin: 0 20px;
  }
`;
