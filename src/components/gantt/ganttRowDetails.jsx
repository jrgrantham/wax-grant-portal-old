import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";

import {
  dAndMRowRemoved,
  dAndMChangedDate,
  dAndMChangeKeyValue,
} from "../../store/projectData/delsAndMils";
import EditModal from "./ganttEditModal";

function GanttRowDetails(props) {
  const dispatch = useDispatch();
  const projectDates = useSelector((state) => state.project.data.dates);
  const [edit, setEdit] = useState(false);
  // const [edit, setEdit] = useState(props.row.rowId === 'ganttRow1');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { row, isWP, provided } = props;
  const { description, resources, days, schedule } = row;

  const dateIndex = schedule
    .map(function(date) {
      return date.status;
    })
    .indexOf(true);

  const expandedResources = resources
    ? resources.map((person, index) => <span key={index}>{person.name} </span>)
    : null;

  // join these
  const wpRowDetails = (
    <div className="rowDescription">
      <div {...provided.dragHandleProps} className="hidden menu">
        <BiMenu />
      </div>
      <p>{description}</p>
    </div>
  );

  const wp = (
    <div className="rowData">
      <p className="resources">{expandedResources}</p>
      <p className="days">{days}</p>
      <button onClick={() => setEdit(!edit)} className="hidden icon">
        <BiDotsHorizontalRounded />
      </button>
    </div>
  );
  // join these

  // join these
  const dmRowDetails = (
    <div className="rowDescription">
      <div {...provided.dragHandleProps} className="hidden menu">
        <BiMenu />
      </div>
      <input
        value={description}
        type="text"
        onChange={(e) =>
          dispatch(
            dAndMChangeKeyValue({
              rowId: row.rowId,
              key: "description",
              value: e.target.value,
            })
          )
        }
        onBlur={(e) => {
          console.log("remember to send to the server");
        }}
      />
      {/* <p>{description}</p> */}
    </div>
  );

  const deleteDM = (
    <div className="confirmDelete">
      <button className="cancel" onClick={() => setConfirmDelete(false)}>
        Cancel
      </button>
      <button onClick={() => dispatch(dAndMRowRemoved(row.rowId))}>
        Confirm
      </button>
    </div>
  );

  const dm = (
    <div className="rowData">
      {confirmDelete ? (
        deleteDM
      ) : (
        <>
          <select
            value={dateIndex}
            onChange={(e) =>
              dispatch(
                dAndMChangedDate({ row, value: parseInt(e.target.value) })
              )
            }
          >
            {projectDates.map((date, index) => (
              <option value={index} key={index}>
                {date}
              </option>
            ))}
          </select>
          <div className="hidden">
            <BiTrash
              style={{ cursor: "pointer" }}
              onClick={() => setConfirmDelete(true)}
            />
          </div>
        </>
      )}
    </div>
  );
  // join these

  return (
    <Container>
      {edit ? <EditModal setEdit={setEdit} row={row} /> : null}
      {isWP ? wpRowDetails : dmRowDetails}
      {isWP ? wp : dm}
    </Container>
  );
}

export default GanttRowDetails;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  width: 500px;
  height: 50px;
  border-bottom: 1px solid lightgrey;
  &:hover .hidden {
    opacity: 1;
  }
  .hidden {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .icon {
    padding: 3px 1px 0px 1px;
  }

  .rowDescription {
    display: flex;
    align-items: center;
    p {
      margin-left: 5px;
    }
    input {
      width: 280px;
      margin-left: 5px;
      padding-left: 10px;
      background-color: #f5f5f5;
    }
    .menu {
      padding-top: 4px;
    }
  }

  .rowData {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .resources {
      margin-right: 15px;
    }
    .days {
      width: 30px;
      margin-right: 5px;
      text-align: right;
    }
    select {
      margin-right: 5px;
    }
    button {
    }
  }

  .confirmDelete {
    display: flex;
    justify-content: flex-end;
    .cancel {
      margin-right: 10px;
    }
  }
`;
