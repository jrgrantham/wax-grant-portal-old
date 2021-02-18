import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  wPRowRemoved,
  wPSetNumberOfBars,
} from "../../store/projectData/workPackages";

function EditModal(props) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const row = props.row;
  const {
    dayLoading,
    days,
    description,
    resources,
    workPackageTitle,
  } = row;

  // console.log(resources);

  const deleteWP = (
    <div className="confirmDelete">
      <button onClick={() => setConfirmDelete(false)}>Cancel</button>
      <button onClick={() => dispatch(wPRowRemoved(row.rowId))}>
        Confirm Delete
      </button>
    </div>
  );

  return (
    <Container>
      <div className="editWindow">
        <div className="top row">
          <button onClick={() => props.setEdit(false)}>Close</button>
        </div>
        <div className='content row'>
          <p>Work Pack: {workPackageTitle}</p>
          <p>Description: {description}</p>
          <p>Assigned Days: {days}</p>
          <p>Loading: {dayLoading}</p>
          {/* <p>Loading: {resources}</p> */}
          <button onClick={() => dispatch(wPSetNumberOfBars({row, bars: 5}))}>set bars</button>
        </div>
        <div className="bottom row">
          {confirmDelete ? (
            deleteWP
          ) : (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default EditModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.6);
  z-index: 2;

  p {
    padding-bottom: 10px;
  }
  button {
    /* margin-left: 25px; */
  }

  .editWindow {
    width: 500px;
    height: 300px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
  }

  .row {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  .content {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .confirmDelete {
    display: flex;
    justify-content: space-between;
    width: 175px;
  }
`;
