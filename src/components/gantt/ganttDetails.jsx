import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";

import { dAndMRowRemoved } from "../../store/projectData/delsAndMils";
import EditModal from "./ganttEditModal";

function GanttDetails(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { row, isWP } = props;
  const { description, resources, days } = row;

  const expandedResources = resources
    ? resources.map((person, index) => <span key={index}>{person.name} </span>)
    : null;

  const deleteDM = (
    <div className="confirmDelete">
      <button onClick={() => setConfirmDelete(false)}>Cancel</button>
      <button onClick={() => dispatch(dAndMRowRemoved(row.rowId))}>
        Confirm Delete
      </button>
    </div>
  );

  return (
    <Container>
      {edit ? <EditModal setEdit={setEdit} row={row}/> : null}
      <div className="rowDescription">
        <BiMenu />
        <p>{description}</p>
      </div>
      {isWP ? (
        <div className="rowData">
          <p>{expandedResources}</p>
          <p>{days}</p>
          <button onClick={() => setEdit(!edit)}>
            <BiDotsHorizontalRounded />
          </button>
        </div>
      ) : (
        <div className="rowData">
          {confirmDelete ? (
            deleteDM
          ) : (
            <>
              <p>Jul 2021</p>
              <BiTrash
                style={{ cursor: "pointer" }}
                onClick={() => setConfirmDelete(true)}
              />
            </>
          )}
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

  .confirmDelete {
    display: flex;
    justify-content: space-between;
    width: 175px;
  }
`;
