import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu, BiTrash } from "react-icons/bi";
import { Container } from "./ganttRowStyling";

import {
  dAndMRowRemoved,
  dAndMChangedDate,
  dAndMChangeKeyValue,
} from "../../store/projectData/delsAndMils";

function GanttRowDetails(props) {
  const dispatch = useDispatch();
  const projectDates = useSelector((state) => state.project.data.dates);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { row, provided } = props;
  const { description, schedule } = row;

  const dateIndex = schedule
    .map(function (date) {
      return date.status;
    })
    .indexOf(true);

  function handleDescriptionChange(value) {
    dispatch(
      dAndMChangeKeyValue({
        rowId: row.rowId,
        key: "description",
        value,
      })
    );
  }

  return (
    <Container>
      <div className="rowDescription">
        <div {...provided.dragHandleProps} className="hidden menu">
          <BiMenu />
        </div>
        <input
          className="highlight description packBackground"
          value={description}
          type="text"
          onChange={(e) => handleDescriptionChange(e.target.value)}
          onBlur={(e) => {
            console.log("remember to send to the server");
          }}
        />
      </div>
      <div className="rowData">
        {confirmDelete ? (
          <div className="confirmDelete">
            <button className="cancel" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
            <button onClick={() => dispatch(dAndMRowRemoved(row.rowId))}>
              Confirm
            </button>
          </div>
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
                <option value={index} key={index} className="date">
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
    </Container>
  );
}

export default GanttRowDetails;
