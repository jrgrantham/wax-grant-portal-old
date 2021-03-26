import { store } from "../store";
import { moveTaskBar } from "../store/projectData/tasks";
import produce from "immer";

export function moveBar(data, bar, e) {
  const {
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    task,
    blockCount,
  } = data;

  let offset = 0;
  let mousePosition;
  let originalIndex = 0;
  let position = 0;

  offset = bar.offsetLeft - e.clientX;
  originalIndex = bar.offsetLeft / blockWidth;

  function dropBar() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", dropBar);
    bar.style.left = null;
    const newIndex = Math.floor(position / blockWidth + 0.5);
    if (mousePosition !== undefined && newIndex !== originalIndex) {
      const updatedRow = updateRow(task, originalIndex, newIndex, blockCount);
      store.dispatch(moveTaskBar(updatedRow));
    }
  }

  document.addEventListener("mouseup", dropBar, false);
  document.addEventListener("mousemove", handleMouseMove, false);

  function handleMouseMove(event) {
    mousePosition = event.clientX;
    position = Math.min(
      Math.max(mousePosition + offset, leftObstruction * blockWidth),
      rightObstruction * blockWidth - barWidth
    );
    bar.style.left = position + "px";
  }
}

function updateRow(task, originalIndex, newIndex, blockCount) {
  const newRow = produce(task, (draft) => {
    const movement = newIndex - originalIndex;
    const item = draft.schedule.splice(originalIndex, blockCount);
    draft.schedule.splice(originalIndex + movement, 0, ...item);
    for (let i = 0; i < task.schedule.length; i++) {
      draft.schedule[i].scheduleIndex = i;
    }
  });
  return newRow;
}
