import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded } from "react-icons/bi";
import { isNumberKey } from "../../helpers";

import EditModal from "./ganttModalEdit";
import ResourcesModal from "../ganttResourcesModal/ganttResourcesModal";
import {
  wPChangeKeyValue,
  wPDaysUpdated,
} from "../../store/projectData/workPackages";
import { Container } from "./ganttRowStyling";

function GanttRowWork(props) {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [resourcesModal, setResourcesModal] = useState(true);
  const { row, provided } = props;
  const { description, resources, days } = row;

  let resourcesArray = [];
  for (const property in resources) {
    // console.log(`${property}: ${resources[property]}`);
    if (resources[property] > 0) resourcesArray.push(`${property}`);
  }

  const expandedResources = resourcesArray
    ? resourcesArray.map((person, index) => (
        <span key={index}>{person}.&nbsp;</span>
      ))
    : null;

  function handleDescriptionChange(value) {
    dispatch(
      wPChangeKeyValue({
        rowId: row.rowId,
        key: "description",
        value,
      })
    );
  }
  function handleDayChange(e) {
    const lastThreeNumbers = e.target.value.slice(-3);
    const newValue = parseInt(lastThreeNumbers);
    if (newValue < 1) return;
    dispatch(wPDaysUpdated({ row, days: newValue }));
  }

  return (
    <Container>
      {editModal ? (
        <EditModal
          allTitles={props.allTitles}
          setEditModal={setEditModal}
          row={row}
        />
      ) : null}
      {resourcesModal ? (
        <ResourcesModal setResourcesModal={setResourcesModal} row={row} />
      ) : null}
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
        <button
          onClick={() => setResourcesModal(!editModal)}
          className="resources highlight packBackground"
        >
          {expandedResources}
        </button>
        <input
          className="days highlight packBackground"
          type="text"
          value={days}
          onKeyDown={(e) => isNumberKey(e)}
          onChange={(e) => handleDayChange(e)}
          onBlur={(e) => {
            console.log("remember to send to the server");
          }}
        />
        <button
          onClick={() => setEditModal(!editModal)}
          className="hidden icon"
        >
          <BiDotsHorizontalRounded />
        </button>
      </div>
    </Container>
  );
}

export default GanttRowWork;
