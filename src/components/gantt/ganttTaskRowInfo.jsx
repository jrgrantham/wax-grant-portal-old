import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import EditModal from "../modals/ganttEditModal";
import ResourcesModal from "../modals/ganttResourcesModal";
import { wPChangeKeyValue, wPDaysUpdated } from "../../store/projectData/tasks";
import { Container } from "./ganttRowStyling";
import { taskResources } from "../../store";

function GanttRowWork(props) {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [resourcesModal, setResourcesModal] = useState(true);
  const { task, provided } = props;
  const { description, days } = task;

  function handleDescriptionChange(value) {
    dispatch(
      wPChangeKeyValue({
        taskId: task.taskId,
        key: "description",
        value,
      })
    );
  }
  function handleDayChange(e) {
    const lastThreeNumbers = e.target.value.slice(-3);
    const newValue = parseInt(lastThreeNumbers);
    if (newValue < 1) return;
    dispatch(wPDaysUpdated({ task, days: newValue }));
  }

  return (
    <Container>
      {editModal ? (
        <EditModal
          allTitles={props.allTitles}
          setEditModal={setEditModal}
          task={task}
        />
      ) : null}
      {resourcesModal ? (
        <ResourcesModal setResourcesModal={setResourcesModal} packData={props.packData}/>
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
          {taskResources.byTask[task.taskId].people}
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
