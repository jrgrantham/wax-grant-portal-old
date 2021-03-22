import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "./ganttPackStyling";

import {
  wPReorderRows,
  wPRowAdded,
  wPTitleChanged,
} from "../../store/projectData/tasks";
import { dAndMReorderRows } from "../../store/projectData/deadlines";
import GanttRowWork from "./ganttTaskRowInfo";
import EditModal from "../modals/ganttEditModal";

function GanttPackWork(props) {
  const title = props.title;
  const packData = props.workPackData;
  const dispatch = useDispatch();
  const isWP = !(title === "Deliverables" || title === "Milestones");

  const [edit, setEdit] = useState(false);
  const [editTitleWindow, setEditTitleWindow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { projectLength } = useSelector((state) => state.project.data);
  function handleAddNewRow() {
    dispatch(wPRowAdded({ projectLength, title }));
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
    if (isWP) dispatch(wPReorderRows({ task, movement }));
    else dispatch(dAndMReorderRows({ taskId: task.taskId, movement }));
  }

  function handleEditTitle(value) {
    if (value === "Deliverables" || title === "Milestones") return;
    console.log(value);
    setNewTitle(value);
  }

  function sendEditedTitle() {
    dispatch(wPTitleChanged({ oldTitle: title, newTitle: newTitle }));
    setEditTitleWindow(false);
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
              // onBlur={sendEditedTitle}
            />
            <button className="titleButton" onClick={sendEditedTitle}>
              Update
            </button>
            <button
              className="titleButton"
              onClick={() => setEditTitleWindow(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* <button onClick={() => setEditTitleWindow(true)}> */}
            <h3 className="title" onClick={() => setEditTitleWindow(true)}>
              {title}
            </h3>
            {/* </button> */}
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
                        <GanttRowWork
                          packData={packData}
                          allTitles={props.allTitles}
                          provided={provided}
                          key={index}
                          task={task}
                          isWP={isWP}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className="bottom packBackground">
                <button onClick={handleAddNewRow}>add task</button>
                <p className="days">{calculateDays()}</p>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackWork;
