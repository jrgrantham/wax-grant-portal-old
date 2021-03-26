import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BiMenu, BiDotsHorizontalRounded } from "react-icons/bi";
import { isNumberKey, getResources, toastDelay } from "../../helpers";
import EditModal from "../modals/ganttEditModal";
import ResourcesModal from "../modals/ganttResourcesModal";
import {
  updateTaskKeyValue,
  updateTaskDays,
} from "../../store/projectData/tasks";
import tick from "../../images/tick-grey.png";
import { Container } from "./ganttRowStyling";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function GanttTaskRowInfo(props) {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [resourcesModal, setResourcesModal] = useState(false);
  const { task, provided, packData, taskPackTitles } = props;
  const { description, days } = task;
  const resources = getResources();
  const buttonContent = resources[task.taskId].people;
  const [showEditDays, setShowEditDays] = useState(false);
  const [newDays, setNewDays] = useState(days);

  function handleDescriptionChange(value) {
    dispatch(
      updateTaskKeyValue({
        taskId: task.taskId,
        key: "description",
        value,
      })
    );
  }

  function handleClick() {
    setShowEditDays(true);
    // document.addEventListener("mousedown", handleMouseDown, false);
  }
  // function handleMouseDown(e) {
  //   setShowEditDays(false);
  //   document.removeEventListener("mousedown", handleMouseDown);
  //   if (e.target.id === "accept") {
  //     acceptNewDays();
  //   } else setNewDays(days);
  // }
  function handleDayChange(e) {
    if (e.target.value) {
      const lastThreeNumbers = e.target.value.slice(-3);
      setNewDays(parseInt(lastThreeNumbers));
    } else {
      setNewDays(0);
    }
  }
  function acceptNewDays() {
    setShowEditDays(false);
    console.log(newDays);
    if (newDays > 0) {
      if (newDays !== days) dispatch(updateTaskDays({ task, days: newDays }));
    } else {
      toast.info("Must enter at least 1 day", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: toastDelay,
      });
    }
  }

  return (
    <Container>
      {editModal ? (
        <EditModal
          taskPackTitles={taskPackTitles}
          setEditModal={setEditModal}
          task={task}
        />
      ) : null}
      {resourcesModal ? (
        <ResourcesModal
          setResourcesModal={setResourcesModal}
          packData={packData}
        />
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
          {buttonContent}
        </button>

        {showEditDays ? (
          <div className="editDays">
            <input
              autoFocus
              className="days highlight packBackground"
              type="text"
              value={newDays}
              onKeyDown={(e) => isNumberKey(e)}
              onChange={(e) => handleDayChange(e)}
            />
            {/* <button className="accept"> */}
            <button onClick={acceptNewDays} className="accept">
              <img id="accept" src={tick} alt="accept" />
            </button>
          </div>
        ) : (
          <button
            className="days highlight packBackground"
            onClick={handleClick}
          >
            {days}
          </button>
        )}

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

export default GanttTaskRowInfo;
