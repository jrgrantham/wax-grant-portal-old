// import { store } from "../store";
// import { wPBarMoved } from "../store/projectData/workPackages";
import produce from "immer";
import { wPBarMoved } from "../store/projectData/workPackages";
import { store } from "../store";

import { currentCombinedLengthOfBars, spreadWork } from "./index";
import { toast } from "react-toastify";
toast.configure();

export function resizeBar(data, barDiv, e) {
  const {
    row,
    // blockCount,
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    startPosition,
    setShowBlock,
  } = data;

  let blockCount = data.blockCount;
  let width;
  let origStartIndex = startPosition / blockWidth;
  let newStartIndex = startPosition / blockWidth;
  let origEndIndex = (startPosition + barWidth) / blockWidth - 1;
  let newEndIndex = (startPosition + barWidth) / blockWidth - 1;
  let change = 0;
  let updating = false; // helps multiple logs
  const handle = e.target.id.slice(-3);

  window.addEventListener("mousemove", resize, false);
  window.addEventListener("mouseup", stopResize, false);

  function setSize(dimension) {
    barDiv.style.width = dimension + "px";
  }

  function resize(e) {
    setShowBlock(false);
    if (handle === "rgt") {
      updating = true;
      const uncontrolledWidth = e.pageX - barDiv.getBoundingClientRect().left;
      width = Math.min(
        Math.max(blockWidth, uncontrolledWidth),
        rightObstruction * blockWidth - startPosition
      );
      setSize(width);
    } else if (handle === "lft") {
      updating = true;
      // barDiv.style.width = Math.max(monthWidth, monthWidth * blockCount - (e.pageX - originalMouseX) + "px");
      // barDiv.style.left = e.pageX - originalMouseX + "px";
    }
  }

  function stopResize() {
    setShowBlock(true);
    window.removeEventListener("mousemove", resize);
    const newBlockCount = Math.floor(width / blockWidth + 0.5);
    if (updating && blockCount !== newBlockCount) {
      change = newBlockCount - blockCount;
      newEndIndex = newBlockCount + startPosition / blockWidth - 1;
      setSize(newBlockCount * blockWidth);
      updateRow();
      blockCount = newBlockCount;
    } else setSize(blockCount * blockWidth);
    updating = false;
  }

  function updateRow() {
    const updatedRow = produce(row, (draft) => {
      draft.days = Math.max(
        currentCombinedLengthOfBars(row.schedule) + change,
        row.days
      );
      draft.row = updateBar(draft);
      spreadWork(draft);
    });
    store.dispatch(wPBarMoved(updatedRow));
  }

  function updateBar(row) {
    const earliest = Math.min(origStartIndex, newStartIndex);
    const latest = Math.max(origEndIndex, newEndIndex);
    let workingDay = false;
    let started = false;
    let barNumber = 0;
    for (let i = earliest; i <= latest; i++) {
      if (!started && i >= newStartIndex) {
        workingDay = true;
        started = true;
        barNumber = row.schedule[i].barNumber
      }
      if (started && i > newEndIndex) {
        workingDay = false;
        barNumber = 0;
      }
      row.schedule[i].status = workingDay;
      row.schedule[i].barNumber = barNumber;
    }
  }

  // function setPropertiesByFirstAndLast(schedule) {
  //   let workingMonth = false;
  //   let barNumber = 0;
  //   for (let i = 0; i < schedule.length; i++) {
  //     schedule[i].scheduleIndex = i;
  //     if (schedule[i].start) {
  //       workingMonth = true;
  //       barNumber = schedule[i].barNumber;
  //     }
  //     schedule[i].status = workingMonth;
  //     schedule[i].barNumber = barNumber;
  //     if (schedule[i].end) {
  //       workingMonth = false;
  //       barNumber = 0;
  //     }
  //     if (schedule[i].status === false) {
  //       schedule[i].value = 0;
  //     }
  //   }
  //   return schedule;
  // }

  // function reorderWPItems(array, result) {
  //   const [item] = array.splice(result.source.index, 1);
  //   array.splice(result.destination.index, 0, item);
  //   return array;
  // }

  // const { blockWidth, leftObstruction, rightObstruction, barWidth } = data;
  // let isDown = false;
  // let offset = 0;
  // let mousePosition;
  // let originalIndex = 0;
  // let position = 0;
  // isDown = true;
  // offset = bar.offsetLeft - e.clientX;
  // originalIndex = bar.offsetLeft / blockWidth;
  // function dropBar() {
  //   isDown = false;
  //   document.removeEventListener("mousemove", handleMouseMove); // tried this - not needed
  //   document.removeEventListener("mouseup", dropBar); // tried this - not needed
  //   const newIndex = Math.floor(position / blockWidth + 0.5);
  //   if (mousePosition !== undefined && newIndex !== originalIndex) {
  //     bar.style.left = `${newIndex * 40}px`;
  //     const updatingRow = updateRow(row, originalIndex, newIndex, blockCount);
  //     store.dispatch(wPBarMoved(updatingRow));
  //   }
  // }
  // // document.addEventListener("mouseleave", dropBar, false);
  // document.addEventListener("mouseup", dropBar, false);
  // document.addEventListener("mousemove", handleMouseMove, false);
  // function handleMouseMove(event) {
  //   if (isDown) {
  //     mousePosition = event.clientX;
  //     position = Math.min(
  //       Math.max(mousePosition + offset, leftObstruction * blockWidth),
  //       rightObstruction * blockWidth - barWidth
  //     );
  //     bar.style.left = position + "px";
  //   }
  // }
}

function updateRow(row, originalIndex, newIndex, blockCount) {
  const newRow = produce(row, (draft) => {
    const draftSchedule = draft.schedule; // from draft
    const movement = newIndex - originalIndex;
    const item = draftSchedule.splice(originalIndex, blockCount);
    draftSchedule.splice(originalIndex + movement, 0, ...item);
  });
  return newRow;
}
