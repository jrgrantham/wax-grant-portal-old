import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { schedule } from "../data";
import GanttBlock from "./ganttBlock";

function GanttRow() {
  const [gantt, setGantt] = useState(schedule);
  const activeColor = "skyBlue";
  const copiedMonths = Array.from(gantt);

  let startDateIndex = gantt
    .map(function (Month) {
      return Month.start;
    })
    .indexOf(true);
  let endDateIndex = gantt
    .map(function (Month) {
      return Month.end;
    })
    .indexOf(true);

  function handleMovingMonth(result) {
    if (!result.destination) return;

    const originalDate = result.source.index;
    const newDate = result.destination.index;
    const draggedMonthObject = gantt[originalDate];

    if (!startOrEnd(draggedMonthObject)) return;

    if (draggedMonthObject.start && draggedMonthObject.end) {
      splitSingleMonth(newDate);
    } else if (draggedMonthObject.end && newDate <= startDateIndex) {
      createSingleEvent(newDate);
    } else if (draggedMonthObject.start && newDate >= endDateIndex) {
      createSingleEvent(newDate);
    } else {
      const [movedMonth] = copiedMonths.splice(originalDate, 1);
      copiedMonths.splice(newDate, 0, movedMonth);
      setMonthsByFirstAndLast();
    }
    clearUnworkedMonthValues();
    setGantt(copiedMonths);
  }

  function startOrEnd(Month) {
    if (Month.start || Month.end) {
      return true;
    }
    return false;
  }

  function setMonthsByFirstAndLast() {
    let workingMonth = false;
    for (let i = 0; i < copiedMonths.length; i++) {
      copiedMonths[i].color = "transparent";

      if (copiedMonths[i].start) {
        copiedMonths[i].color = activeColor;
        workingMonth = true;
      }
      copiedMonths[i].color = workingMonth ? activeColor : "transparent";
      copiedMonths[i].status = workingMonth;
      if (copiedMonths[i].end) {
        workingMonth = false;
      }
    }
  }

  function splitSingleMonth(date) {
    const first = Math.min(date, startDateIndex); // startDate = endDate
    const last = Math.max(date, startDateIndex); // startDate = endDate
    copiedMonths[first].start = true;
    copiedMonths[first].end = false;
    copiedMonths[last].end = true;
    copiedMonths[last].start = false;
    setMonthsByFirstAndLast();
  }

  function createSingleEvent(index) {
    for (let i = 0; i < copiedMonths.length; i++) {
      copiedMonths[i].color = "transparent";
      copiedMonths[i].start = false;
      copiedMonths[i].end = false;
      copiedMonths[i].status = false;
      copiedMonths[i].value = 0;
      if (i === index) {
        copiedMonths[i].color = activeColor;
        copiedMonths[i].start = true;
        copiedMonths[i].end = true;
        copiedMonths[i].status = true;
      }
    }
  }

  function clearUnworkedMonthValues() {
    for (let i = 0; i < copiedMonths.length; i++) {
      if (copiedMonths[i].status === false) {
        copiedMonths[i].value = 0;
      }
    }
  }

  const totalWorkedMonths = 10;
  function evenlySpreadWorkedMonths() {
    const duration = endDateIndex - startDateIndex + 1;
    const Months = Math.floor(totalWorkedMonths / duration);
    const remainderMonths = totalWorkedMonths % duration;
    let j = 0;
    for (let i = startDateIndex; i < endDateIndex + 1; i++) {
      if (j < remainderMonths) {
        copiedMonths[i].value = Months + 1;
        j++;
      } else copiedMonths[i].value = Months;
    }
    setGantt(copiedMonths);
  }

  return (
    <Container>
      <button onClick={evenlySpreadWorkedMonths}>spread hours</button>
      <DragDropContext onDragEnd={handleMovingMonth}>
        <Droppable droppableId="calendar" direction="horizontal">
          {(provided) => (
            <div
              className="chartArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {gantt.map(({ id, value, status, start, end }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        className="MonthContainer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <GanttBlock
                          start={start ? 1 : 0}
                          end={end ? 1 : 0}
                          status={status}
                          color={activeColor}
                          value={value}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  .chartArea {
    display: flex;
  }
  button {
    margin: 0px 5px;
  }
`;

export default GanttRow;
