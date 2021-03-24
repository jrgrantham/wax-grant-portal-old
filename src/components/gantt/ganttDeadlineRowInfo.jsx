import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu, BiTrash } from "react-icons/bi";
import { Container } from "./ganttRowStyling";
import bin from "../../images/bin-grey.png";

import {
  dAndMRowRemoved,
  // dAndMChangedDate,
  dAndMChangeKeyValue,
} from "../../store/projectData/deadlines";

function GanttRowDetails(props) {
  const dispatch = useDispatch();
  const projectDates = useSelector((state) => state.project.data.dates);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { task, provided } = props;
  const { description, scheduled } = task;

  const dateIndex = scheduled;

  function handleDescriptionChange(value) {
    dispatch(
      dAndMChangeKeyValue({
        taskId: task.taskId,
        key: "description",
        value,
      })
    );
  }
  function handleDateChange(value) {
    dispatch(
      dAndMChangeKeyValue({
        taskId: task.taskId,
        key: "scheduled",
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
            <button onClick={() => dispatch(dAndMRowRemoved(task.taskId))}>
              Confirm
            </button>
          </div>
        ) : (
          <>
            <select
              className="highlight"
              value={dateIndex}
              onChange={(e) => handleDateChange(parseInt(e.target.value))}
            >
              {projectDates.map((date, index) => (
                <option value={index} key={index} className="date">
                  {date}
                </option>
              ))}
            </select>
            <div className="hidden">
              <img src={bin} alt="delete" />
              {/* <BiTrash
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(dAndMRowRemoved(task.taskId))}
              /> */}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default GanttRowDetails;
