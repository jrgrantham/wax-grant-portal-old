import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";
import { isNumberKey } from "../../helpers";

import {
  dAndMRowRemoved,
  dAndMChangedDate,
  dAndMChangeKeyValue,
} from "../../store/projectData/delsAndMils";
import EditModal from "./ganttEditModal";
import ResourcesModal from "./ganttResourcesModal";
import {
  wPChangeKeyValue,
  wPDaysUpdated,
} from "../../store/projectData/workPackages";

function GanttRowDetails(props) {
  const dispatch = useDispatch();
  const projectDates = useSelector((state) => state.project.data.dates);
  const [editModal, setEditModal] = useState(false);
  const [resourcesModal, setResourcesModal] = useState(false);
  // const [editModal, setEditModal] = useState(props.row.rowId === 'ganttRow1');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { row, isWP, provided } = props;
  const { description, resources, days, schedule } = row;

  const dateIndex = schedule
    .map(function(date) {
      return date.status;
    })
    .indexOf(true);

  const expandedResources = resources
    ? resources.map((person, index) => (
        <span key={index}>{person.name}.&nbsp;</span>
      ))
    : null;

  function handleDescriptionChange(value) {

    if (isWP)
      dispatch(
        wPChangeKeyValue({
          rowId: row.rowId,
          key: "description",
          value,
        })
      );
    else
      dispatch(
        dAndMChangeKeyValue({
          rowId: row.rowId,
          key: "description",
          value,
        })
      );
  }
  function handleDayChange(e) {
    const lastThreeNumbers = e.target.value.slice(-3);
    const newValue = parseInt(lastThreeNumbers);
    if (newValue < 1) return
    dispatch(wPDaysUpdated({ row, days: newValue }));
  }

  const wp = (
    <div className="rowData">
      {/* <div> */}
      <button
        onClick={() => setResourcesModal(!editModal)}
        className="resources highlight"
      >
        {expandedResources}
      </button>
      {/* </div> */}
      <input
        className="days highlight"
        type="text"
        value={days}
        onKeyDown={(e) => isNumberKey(e)}
        onChange={(e) => handleDayChange(e)}
        onBlur={(e) => {
          console.log("remember to send to the server");
        }}
      />
      <button onClick={() => setEditModal(!editModal)} className="hidden icon">
        <BiDotsHorizontalRounded />
      </button>
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
            className="highlight"
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
      {editModal ? <EditModal setEditModal={setEditModal} row={row} /> : null}
      {resourcesModal ? (
        <ResourcesModal setResourcesModal={setResourcesModal} row={row} />
      ) : null}
      <div className="rowDescription">
        <div {...provided.dragHandleProps} className="hidden menu">
          <BiMenu />
        </div>
        <input
          className="highlight"
          value={description}
          type="text"
          onChange={(e) => handleDescriptionChange(e.target.value)}
          onBlur={(e) => {
            console.log("remember to send to the server");
          }}
        />
        {/* <p>{description}</p> */}
      </div>
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
    transition: opacity 0.3s;
    opacity: 1;
  }
  &:hover .highlight {
    transition: background-color 0.3s;
    background-color: #f1f1f1;
  }
  .hidden {
    opacity: 0;
  }
  .icon {
    padding: 3px 1px 0px 1px;
    border: none;
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
      padding-left: 5px;
      text-overflow: ellipsis;
    }
    .menu {
      padding-top: 4px;
    }
  }

  .rowData {
    display: flex;
    justify-content: space-between;
    align-items: center;
    select {
      cursor: pointer;
      padding-left: 8px;
      padding-right: 5px;
      margin-right: 5px;
    }
    .resources {
      cursor: pointer;
      height: 27px;
      width: 100px;
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 14px;
      border: none;
      border-radius: 5px;
      overflow: hidden;
      /* border: 1px solid red; */
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .days {
      width: 40px;
      margin-right: 5px;
      text-align: right;
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
