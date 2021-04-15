import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "./ganttPackStyling";

import {
  reorderTasks,
  addTask,
  updateTaskPackTitle,
  removeTaskPack,
} from "../../store/projectData/tasks";
// import { dAndMReorderRows } from "../../store/projectData/deadlines";
import GanttTaskRowInfo from "./ganttTaskRowInfo";
import EditModal from "../modals/ganttEditModal";
import tick from "../../images/tick-white.png";
import add from "../../images/add-grey.png";
import bin from "../../images/bin-grey.png";
import { deleteTaskAllocations } from "../../store/projectData/allocations";

function GanttPackWork(props) {
  const dispatch = useDispatch();

  const { title, index, packData } = props;
  const wpNumber = index + 1;

  const [edit, setEdit] = useState(false);
  const [editTitleWindow, setEditTitleWindow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  // const [confirmDelete, setConfirmDelete] = useState(false);

  const { projectLength } = useSelector((state) => state.project.data);
  function handleAddNewRow() {
    dispatch(addTask({ projectLength, title }));
  }

  function calculateDays() {
    let days = 0;
    packData.forEach((task) => {
      days += task.days;
    });
    return days;
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const task = packData[result.source.index];
    dispatch(reorderTasks({ task, movement }));
  }

  function handleEditTitle(value) {
    if (value === "Deliverables" || title === "Milestones") return;
    setNewTitle(value);
  }

  function sendEditedTitle() {
    if (title !== newTitle)
      dispatch(updateTaskPackTitle({ oldTitle: title, newTitle: newTitle }));
    setEditTitleWindow(false);
  }

  function handleRemovePack() {
    const taskList = [...new Set(packData.map((task) => task.taskId))];
    taskList.forEach((taskId) => {
      dispatch(deleteTaskAllocations({ taskId }));
    });
    dispatch(removeTaskPack({ workPackageTitle: title }));
    // setConfirmDelete(false);
  }

  return (
    <Container titleBarColor={props.titleBarColor}>
      {edit ? <EditModal setEdit={setEdit} /> : null}
      <div className="titleBar">
        {editTitleWindow ? (
          <>
            <input
              className="title"
              type="text"
              value={newTitle}
              onChange={(e) => handleEditTitle(e.target.value)}
            />
            <button className="evenWidth" onClick={sendEditedTitle}>
              <img src={tick} alt="accept" />
            </button>
          </>
        ) : (
          <>
            <h3 className="title" onClick={() => setEditTitleWindow(true)}>
              {`WP${wpNumber} - ${title}`}
            </h3>
            <div className="info">
              <h3 className="resources">Resources</h3>
              <h3 className="days">Days</h3>
            </div>
          </>
        )}
      </div>
      <DragDropContext onDragEnd={handleMovingRow}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {packData.map((task, index) => {
                return (
                  <Draggable
                    key={task.taskId}
                    draggableId={task.taskId}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="MonthContainer packBackground"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <GanttTaskRowInfo
                          packData={packData}
                          taskPackTitles={props.taskPackTitles}
                          provided={provided}
                          key={index}
                          task={task}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className="bottom packBackground">
                <div>
                <button className="evenWidth" onClick={handleAddNewRow}>
                  <img src={add} alt="add" />
                </button>
                <button
                  onClick={() => handleRemovePack()}
                  className="evenWidth delete"
                >
                  <img src={bin} alt="delete" />
                </button>
                </div>
                <div className="evenWidth">
                  <p className="days">{calculateDays()}</p>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackWork;
