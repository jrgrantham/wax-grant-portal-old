import React, { useState } from "react";
import styled from "styled-components";
// import { FiClock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";
import { wPSetNumberOfBars } from "../../store/projectData/workPackages";

function GanttDetails(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { row, isWP } = props;
  const { description, resources, days } = row;

  const expandedResources = resources
    ? resources.map((person, index) => <span key={index}>{person.name} </span>)
    : null;

  const editModal = (
    <div className="editScreen" id="outside">
      <div className="editWindow">
        <div className="topRow">
          <BiTrash />
          <button onClick={() => setEdit(false)}>x</button>
        </div>
        <button onClick={() => dispatch(wPSetNumberOfBars(row))}>bars</button>
        <button onClick={(e) => console.log(e.target)}>log rowId</button>
        <button onClick={() => setEdit(!edit)}>x</button>
      </div>
    </div>
  );

  return (
    <Container>
      {edit ? editModal : null}
      <div className="rowDescription">
        <BiMenu />
        <p>{description}</p>
      </div>
      {isWP ? (
        <div className="rowData WP">
          <p>{expandedResources}</p>
          <p>{days}</p>
          <button onClick={() => setEdit(!edit)}>
            <BiDotsHorizontalRounded />
          </button>
        </div>
      ) : (
        <div className="rowData other">
          <p>Jul 2021</p>
          <BiTrash />
        </div>
      )}
    </Container>
  );
}

export default GanttDetails;

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

  .editScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(20, 20, 20, 0.7);
    z-index: 2;

    .editWindow {
      width: 500px;
      height: 400px;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      background-color: white;
      border: 1px solid black;
      border-radius: 6px;
    }

    .topRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      button {
        padding: 0 5px 4px 5px;
      }
    }
  }
`;
