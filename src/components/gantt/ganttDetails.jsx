import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import { BiMenu, BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";
import {
  evenlySpreadWork,
  setNumberOfBars,
} from "../../state/workPackageActionCreators";

function GanttDetails(props) {
  // console.log('gantt details');
  const [showOptions, setShowOptions] = useState(true);
  const row = props.row;
  const isWP = props.isWP;
  const { description, resources, days, schedule } = row;

  const expandedResources = resources
    ? resources.map((person, index) => <span key={index}>{person.name} </span>)
    : null;

  const rowDescription = (
    <div className="rowDescription">
      <BiMenu />
      <p>{description}</p>
    </div>
  );

  const rowDataForWP = (
    <div className="rowData WP">
      <p>{expandedResources}</p>
      <p>{days}</p>
      <button onClick={() => setShowOptions(!showOptions)}>
        <BiDotsHorizontalRounded />
      </button>
    </div>
  );
  
  const rowDataForOther = (
    <div className="rowData other">
      <p>Jul 2021</p>
      <BiTrash />
    </div>
  );
  
  const optionsForWP = (
    <div className="options">
    <BiTrash />
      <button onClick={() => props.setNumberOfBars(row)}>bars</button>
      <button onClick={() => props.evenlySpreadWork(row)}>
        <FiClock />
      </button>
      <button onClick={(e) => console.log(e.target)}>
        log rowId
      </button>
      <button onClick={() => setShowOptions(!showOptions)}>x</button>
    </div>
  );

  return (
    <Container>
      {showOptions ? (
        <>
          {rowDescription}
          {isWP ? rowDataForWP : rowDataForOther}
        </>
      ) : (
        <div>{optionsForWP}</div>
      )}
    </Container>
  );
}

export default connect((state) => state, {
  evenlySpreadWork,
  setNumberOfBars,
})(GanttDetails);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  width: 500px;
  height: 50px;
  border-bottom: 1px solid lightgrey;

  .rowDescription {
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
    }
  }

  .rowData {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin-right: 10px;
    }
  }

  .options {
    width: 400px;
    height: 80px;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    background-color: #d1d1d1;
    border: 2px solid #a1a1a1;
    border-radius: 10px;
    z-index: 1;
  }
`;
