import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import GanttRowdeadlines from "./ganttDeadlineRowInfo";
import {
  dAndMReorderRows,
  dAndMRowAdded,
} from "../../store/projectData/deadlines";
import add from "../../images/add-grey.png";

import { Container } from "./ganttPackStyling";

function GanttPackdeadlines(props) {
  const title = props.title;
  const packData = props.workPackData;
  const dispatch = useDispatch();
  const isWP = !(title === "Deliverables" || title === "Milestones");

  const { projectLength } = useSelector((state) => state.project.data); // needed for new task

  function handleAddNewRow() {
    const type = title.toLowerCase().slice(0, -1);
    dispatch(dAndMRowAdded({ projectLength, type }));
    // need add task function for dels and mils
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const task = packData[result.source.index];
    dispatch(dAndMReorderRows({ taskId: task.taskId, movement }));
  }

  return (
    <Container titleBarColor={props.titleBarColor}>
      <div className="titleBar">
        <h3>{title}</h3>
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
                        <GanttRowdeadlines
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
                <button className='evenWidth' onClick={handleAddNewRow}>
                  <img src={add} alt="add" />
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackdeadlines;
