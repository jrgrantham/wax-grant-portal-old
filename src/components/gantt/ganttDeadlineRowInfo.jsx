import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { Container } from "./ganttRowStyling";
import bin from "../../images/bin-grey.png";

import {
  deleteDeadline,
  updateDeadline,
} from "../../store/projectData/deadlines";

function GanttRowDetails(props) {
  const dispatch = useDispatch();
  const projectDates = useSelector((state) => state.project.data.dates);
  const { deadline, provided } = props;
  const { description, scheduled, deadlineId } = deadline;

  function handleChange(key, value) {
    dispatch(
      updateDeadline({
        deadlineId,
        key,
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
          name="description"
          className="highlight description packBackground"
          value={description}
          type="text"
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={(e) => {
            console.log("remember to send to the server");
          }}
        />
      </div>
      <div className="rowData">
        <select
          name="scheduled"
          className="highlight"
          value={scheduled}
          onChange={(e) => handleChange("scheduled", parseInt(e.target.value))}
        >
          {projectDates.map((date, index) => (
            <option value={index} key={index} className="date">
              {date}
            </option>
          ))}
        </select>
        <div className="hidden">
          <img
            src={bin}
            alt="delete"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(deleteDeadline({ deadlineId }))}
          />
        </div>
      </div>
    </Container>
  );
}

export default GanttRowDetails;
