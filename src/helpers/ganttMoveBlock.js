import { store } from "../store";
import produce from "immer";
import { dAndMScheduleUpdated } from "../store/projectData/delsAndMils";

export function moveBlock(data, e, blockDiv) {
  document.addEventListener("mouseup", dropBlock, false);
  document.addEventListener("mousemove", handleMouseMove, false);

  const { scheduleLength, blockWidth, position, row } = data;
  const leftObstruction = 0;
  const rightObstruction = scheduleLength - 1;

  let offset = blockDiv.offsetLeft - e.clientX;
  let mousePosition;
  let originalIndex = blockDiv.offsetLeft / blockWidth;
  let newPosition = position;

  function handleMouseMove(event) {
    mousePosition = event.clientX;
    newPosition = Math.min(
      Math.max(mousePosition + offset, leftObstruction * blockWidth),
      rightObstruction * blockWidth
    );
    blockDiv.style.left = newPosition + "px";
  }

  function dropBlock() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", dropBlock);
    const newIndex = Math.floor(newPosition / blockWidth + 0.5);
    if (mousePosition !== undefined && newIndex !== originalIndex) {
      blockDiv.style.left = `${newIndex * 40}px`;
      const updatedRow = updateRow(row, originalIndex, newIndex, 1);
      // console.log(updatedRow);
      store.dispatch(dAndMScheduleUpdated(updatedRow));
    }
  }
}

function updateRow(row, originalIndex, newIndex, blockCount) {
  const newRow = produce(row, (draft) => {
    const movement = newIndex - originalIndex;
    const item = draft.schedule.splice(originalIndex, blockCount);
    draft.schedule.splice(originalIndex + movement, 0, ...item);
  });
  return newRow;
}