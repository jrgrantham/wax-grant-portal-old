import produce from "immer";
import { wPBarMoved } from "../store/projectData/workPackages";
import { store } from "../store";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { currentCombinedLengthOfBars, spreadWork } from "./index";

toast.configure();

export function resizeBar(data, barDiv, e) {
  const {
    row,
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    startPosition,
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
    change = newBlockCount - blockCount;
    if (handle === "rgt" && blockCount !== newBlockCount) {
      newEndIndex = newBlockCount + startPosition / blockWidth - 1;
      updateRow();
    } else if (handle === "rgt") setSize(blockCount * blockWidth);
    else if (handle === "lft") {
      newStartIndex = origStartIndex - change;
      setPosition(newStartIndex * blockWidth);
      updateRow();
    }
  }

  function updateRow() {
    const newLength = currentCombinedLengthOfBars(row.schedule) + change;
    if (newLength > row.days) {
      toast.info("Increased number of days", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
    const updatedRow = produce(row, (draft) => {
      draft.days = Math.max(newLength, row.days);
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
        barNumber = row.schedule[i].barNumber;
      }
      if (started && i > newEndIndex) {
        workingDay = false;
        barNumber = 0;
      }
      row.schedule[i].status = workingDay;
      row.schedule[i].barNumber = barNumber;
    }
  }
}
