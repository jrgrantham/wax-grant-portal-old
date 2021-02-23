import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded, BiTrash } from "react-icons/bi";
import moment from "moment";

import {
  dAndMRowRemoved,
  dAndMChangedDate,
} from "../../store/projectData/delsAndMils";
import EditModal from "./ganttEditModal";

function GanttDetails(props) {
  const dispatch = useDispatch();
  const projectDates = useSelector((state) => state.project.data.dates);
  const projectStart = projectDates[0];
  const startMoment = moment(projectStart, "MMM YYYY");
  const [edit, setEdit] = useState(false);
  // const [edit, setEdit] = useState(props.row.rowId === 'ganttRow1');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { row, isWP, provided } = props;
  const { description, resources, days, schedule } = row;

  function changeDate(value) {
    console.log({ row, value });
    dispatch(dAndMChangedDate({ row, value }));
  }

  const dateIndex = schedule
    .map(function(date) {
      return date.status;
    })
    .indexOf(true);
  const eventDate = startMoment.add(dateIndex, "month").format("MMM YYYY");

  const expandedResources = resources
    ? resources.map((person, index) => <span key={index}>{person.name} </span>)
    : null;

  const deleteDM = (
    <div className="confirmDelete">
      <button className="cancel" onClick={() => setConfirmDelete(false)}>
        Cancel
      </button>
      <button onClick={() => dispatch(dAndMRowRemoved(row.rowId))}>
        Confirm Delete
      </button>
    </div>
  );

  const rowDescription = (
    <div className="rowDescription">
      <div {...provided.dragHandleProps}>
        <BiMenu />
      </div>
      <p>{description}</p>
    </div>
  );

  const wp = (
    <div className="rowData">
      <p>{expandedResources}</p>
      <p>{days}</p>
      <button onClick={() => setEdit(!edit)}>
        <BiDotsHorizontalRounded />
      </button>
    </div>
  );

  const dm = (
    <div className="rowData">
      {confirmDelete ? (
        deleteDM
      ) : (
        <>
          {/* <p>{eventDate}</p> */}
          <select
            value={eventDate}
            onChange={(e) => changeDate(parseInt(e.target.value))}
          >
            {projectDates.map((date, index) => (
              <option value={index} key={index}>
                {date}
              </option>
            ))}
            <option>{eventDate}</option>
          </select>
          <BiTrash
            style={{ cursor: "pointer" }}
            onClick={() => setConfirmDelete(true)}
          />
        </>
      )}
    </div>
  );

  return (
    <Container>
      {edit ? <EditModal setEdit={setEdit} row={row} /> : null}
      {rowDescription}
      {isWP ? wp : dm}
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

  select,
  input {
  }

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
    justify-content: flex-end;
    width: 205px;
    .cancel {
      margin-right: 10px;
    }
  }
`;
