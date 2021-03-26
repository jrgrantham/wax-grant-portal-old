import produce from "immer";
import { moveTaskBar } from "../store/projectData/tasks";
import { store } from "../store";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { currentCombinedLengthOfBars, spreadWork } from "./index";
import { toastDelay } from "./settings";

toast.configure();

export function resizeBar(data, barDiv, e) {
  const {
    task,
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    startPosition,
    barNumber,
    setShowBlock,
  } = data;
  const handle = e.target.id.slice(-3);
  const offset = barDiv.offsetLeft - e.clientX;
  const originalPosition = e.clientX + offset;

  let blockCount = data.blockCount;
  let width;
  let origStartIndex = startPosition / blockWidth;
  let newStartIndex = startPosition / blockWidth;
  let origEndIndex = (startPosition + barWidth) / blockWidth - 1;
  let newEndIndex = (startPosition + barWidth) / blockWidth - 1;
  let change = 0;
  let newPosition = originalPosition;

  window.addEventListener("mousemove", resize, false);
  window.addEventListener("mouseup", stopResize, false);

  function setSize(dimension) {
    if (dimension) barDiv.style.width = dimension + "px";
    else barDiv.style.width = dimension;
  }
  function setPosition(dimension) {
    barDiv.style.left = dimension + "px";
  }

  function resize(e) {
    setShowBlock(false);
    if (handle === "rgt") {
      const uncontrolledWidth = e.pageX - barDiv.getBoundingClientRect().left;
      width = Math.min(
        Math.max(blockWidth, uncontrolledWidth),
        rightObstruction * blockWidth - startPosition
      );
      setSize(width);
    } else if (handle === "lft") {
      newPosition = Math.min(
        Math.max(e.clientX + offset, leftObstruction * blockWidth),
        originalPosition + barWidth - blockWidth
      );
      width = barWidth + originalPosition - newPosition;
      setPosition(newPosition);
      setSize(width);
    }
  }

  function stopResize() {
    setShowBlock(true);
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
    setSize(null);
    if (!width) return; // undefined if no movement
    const newBlockCount = Math.floor(width / blockWidth + 0.5);
    if (handle === "rgt" && blockCount !== newBlockCount) {
      change = newBlockCount - blockCount;
      newEndIndex = newBlockCount + startPosition / blockWidth - 1;
      updateRow();
    } else if (handle === "rgt") setSize(blockCount * blockWidth);
    else if (handle === "lft" && blockCount !== newBlockCount) {
      change = newBlockCount - blockCount;
      newStartIndex = origStartIndex - change;
      setPosition(newStartIndex * blockWidth);
      updateRow();
    } else if (handle === "lft") {
      setSize(blockCount * blockWidth);
    }
  }

  function updateRow() {
    const newLength = currentCombinedLengthOfBars(task.schedule) + change;
    if (newLength > task.days) {
      toast.info("Increased number of days", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: toastDelay,
      });
    }
    const updatedRow = produce(task, (draft) => {
      draft.days = Math.max(newLength, task.days);
      draft.task = updateBar(draft);
      spreadWork(draft);
    });
    store.dispatch(moveTaskBar(updatedRow));
  }

  function updateBar(task) {
    const earliest = Math.min(origStartIndex, newStartIndex);
    const latest = Math.max(origEndIndex, newEndIndex);
    let workingDay = false;
    let started = false;
    for (let i = earliest; i <= latest; i++) {
      if (!started && i >= newStartIndex) {
        workingDay = true;
        started = true;
      }
      if (started && i > newEndIndex) {
        workingDay = false;
      }
      task.schedule[i].status = workingDay;
      if (workingDay) task.schedule[i].barNumber = barNumber;
      else task.schedule[i].barNumber = 0;
    }
  }
}
