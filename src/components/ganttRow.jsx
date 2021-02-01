import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { schedule } from "../data";

function GanttPage() {
  const [gantt, setGantt] = useState(schedule);
  const activeColor = "skyBlue";
  const copiedDays = Array.from(gantt);

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

    if (draggedDayObject.start && draggedDayObject.end) {
      splitSingleDay(newDate);
    } else if (draggedDayObject.end && newDate <= startDateIndex) {
      createSingleEvent(newDate);
    } else if (draggedDayObject.start && newDate >= endDateIndex) {
      createSingleEvent(newDate);
    } else {
      const [movedDay] = copiedDays.splice(originalDate, 1);
      copiedDays.splice(newDate, 0, movedDay);
      setDaysByFirstAndLast();
    }
    setGantt(copiedDays);
  }

  function startOrEnd(day) {
    if (day.start || day.end) {
      return true;
    }
    return false;
  }

  function setDaysByFirstAndLast() {
    let workingDay = false;
    for (let i = 0; i < copiedDays.length; i++) {
      copiedDays[i].color = "transparent";

      if (copiedDays[i].start) {
        copiedDays[i].color = activeColor;
        workingDay = true;
      }
      copiedDays[i].color = workingDay ? activeColor : "transparent";
      copiedDays[i].status = workingDay;
      if (copiedDays[i].end) {
        workingDay = false;
      }
    }
  }

  function splitSingleDay(date) {
    const first = Math.min(date, startDateIndex); // startDate = endDate
    const last = Math.max(date, startDateIndex); // startDate = endDate
    copiedDays[first].start = true;
    copiedDays[first].end = false;
    copiedDays[last].end = true;
    copiedDays[last].start = false;
    setDaysByFirstAndLast();
  }

  function createSingleEvent(index) {
    console.log(index);
    for (let i = 0; i < copiedDays.length; i++) {
      copiedDays[i].color = "transparent";
      copiedDays[i].start = false;
      copiedDays[i].end = false;
      copiedDays[i].status = false;
      copiedDays[i].value = 0;
      if (i === index) {
        copiedDays[i].color = activeColor;
        copiedDays[i].start = true;
        copiedDays[i].end = true;
        copiedDays[i].status = true;
      }
    }
  }

  const totalWorkedDays = 10;
  function evenlySpreadWorkedDays() {
    const duration = endDateIndex - startDateIndex + 1;
    const days = Math.floor(totalWorkedDays / duration);
    const remainderDays = totalWorkedDays % duration;
    let j = 0;
    for (let i = startDateIndex; i < endDateIndex + 1; i++) {
      if (j < remainderDays) {
        copiedDays[i].value = days + 1;
        j++;
      } else copiedDays[i].value = days;
    }
    setGantt(copiedDays);
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
              {gantt.map(({ id, value, status, start, end }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <Day
                        start={start ? 1 : 0}
                        end={end ? 1 : 0}
                        status={status}
                        color={activeColor}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {status ? (
                          <div className="active">
                            <p>{value}</p>
                          </div>
                        ) : null}
                      </Day>
                    )}
                  </Draggable>
                );
              })}
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

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    background-color: ${(props) => props.color};
    margin-left: ${(props) => (props.start ? "15%" : 0)};
    margin-right: ${(props) => (props.end ? "15%" : 0)};

    border-left: ${(props) => (props.start ? "1px solid black" : 0)};
    border-top: ${(props) => (props.status ? "1px solid black" : 0)};
    border-bottom: ${(props) => (props.status ? "1px solid black" : 0)};
    border-right: ${(props) => (props.end ? "1px solid black" : 0)};

    border-top-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-top-right-radius: ${(props) => (props.end ? "25%" : 0)};
    border-bottom-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-bottom-right-radius: ${(props) => (props.end ? "25%" : 0)};
  }
  input {
    width: 20px;
  }
`;

export default GanttPage;
