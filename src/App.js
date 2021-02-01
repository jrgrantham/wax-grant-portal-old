import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./App.css";

import { schedule } from "./data";

function App() {
  const [gantt, setGantt] = useState(schedule);

  let startDateIndex = gantt
    .map(function (day) {
      return day.start;
    })
    .indexOf(true);
  let endDateIndex = gantt
    .map(function (day) {
      return day.end;
    })
    .indexOf(true);

  function handleMovingDay(result) {
    if (!result.destination) return;

    const originalDate = result.source.index;
    const newDate = result.destination.index;
    const draggedDayObject = gantt[originalDate];

    if (!startOrEnd(draggedDayObject)) return;

    const copiedDays = Array.from(gantt);

    if (draggedDayObject.start && draggedDayObject.end) {
      splitSingleDay(newDate, copiedDays);
    } else if (draggedDayObject.end && newDate <= startDateIndex) {
      createSingleEvent(newDate, copiedDays);
    } else if (draggedDayObject.start && newDate >= endDateIndex) {
      createSingleEvent(newDate, copiedDays);
    } else {
      const [movedDay] = copiedDays.splice(originalDate, 1);
      copiedDays.splice(newDate, 0, movedDay);
      setDaysByFirstAndLast(copiedDays);
    }
    setGantt(copiedDays);
  }

  function startOrEnd(day) {
    // console.log(day);
    if (day.start || day.end) {
      return true;
    }
    return false;
  }

  function setDaysByFirstAndLast(copiedDays) {
    let workingDay = false;
    for (let i = 0; i < copiedDays.length; i++) {
      copiedDays[i].color = "white";

      if (copiedDays[i].start) {
        copiedDays[i].color = "skyblue";
        workingDay = true;
      }
      copiedDays[i].color = workingDay ? "skyblue" : "white";
      copiedDays[i].status = workingDay;
      if (copiedDays[i].end) {
        workingDay = false;
      }
    }
  }

  function splitSingleDay(date, copiedDays) {
    const first = Math.min(date, startDateIndex); // startDate = endDate
    const last = Math.max(date, startDateIndex); // startDate = endDat
    copiedDays[first].start = true;
    copiedDays[first].end = false;
    copiedDays[last].end = true;
    copiedDays[last].start = false;
    setDaysByFirstAndLast(copiedDays);
  }

  function createSingleEvent(index, copiedDays) {
    console.log(index);
    for (let i = 0; i < copiedDays.length; i++) {
      copiedDays[i].color = "white";
      copiedDays[i].start = false;
      copiedDays[i].middle = false;
      copiedDays[i].end = false;
      copiedDays[i].status = false;
      if (i === index) {
        copiedDays[i].color = "skyblue";
        copiedDays[i].start = true;
        copiedDays[i].middle = true;
        copiedDays[i].end = true;
        copiedDays[i].status = true;
      }
    }
  }

  return (
    <Container className="App">
      <DragDropContext onDragEnd={handleMovingDay}>
        <Droppable droppableId="calendar" direction="horizontal">
          {(provided) => (
            <ul
              className="chartArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {gantt.map(
                ({ color, id, content, status, start, end }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <Day
                          start={start}
                          end={end}
                          status={status}
                          color={color}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {status ? <div className="active"></div> : null}
                        </Day>
                      )}
                    </Draggable>
                  );
                }
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

const Container = styled.div`
  .chartArea {
    display: flex;
    /* flex-direction: column; */
  }
`;

const Day = styled.div`
  border: 1px solid lightgrey;
  border-left: 0px solid lightgrey;
  border-right: 0.5px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;

  .active {
    margin-top: 15%;
    margin-bottom: 15%;
    width: 100%;
    height: 70%;

    background-color: ${(props) => props.color};
    margin-left: ${(props) => (props.start ? "15%" : 0)};
    margin-right: ${(props) => (props.end ? "15%" : 0)};

    border-left:  ${(props) => (props.start ? '1px solid black' : 0)};
    border-top:  ${(props) => (props.status ? '1px solid black' : 0)};
    border-bottom:  ${(props) => (props.status ? '1px solid black' : 0)};
    border-right:  ${(props) => (props.end ? '1px solid black' : 0)};

    border-top-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-top-right-radius: ${(props) => (props.end ? "25%" : 0)};
    border-bottom-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-bottom-right-radius: ${(props) => (props.end ? "25%" : 0)};
  }
  input {
    width: 20px;
  }
`;

export default App;
