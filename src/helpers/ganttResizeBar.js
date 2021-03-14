// import { store } from "../store";
// import { wPBarMoved } from "../store/projectData/workPackages";
import produce from "immer";
import { monthWidth } from "./settings";

export function resizeBar(data, bar, e, row, barLength, setShowBlock) {
  const { blockWidth, leftObstruction, rightObstruction, barWidth } = data;

  let originalMouseX = e.pageX;
  window.addEventListener("mousemove", resize);
  window.addEventListener("mouseup", stopResize);
  const handle = e.target.id.slice(-3);

  let width;

  function resize(e) {
    setShowBlock(false);
    if (handle === "rgt") {
      width = e.pageX - bar.getBoundingClientRect().left;
      bar.style.width = Math.max(blockWidth, width) + "px";
    } else if (handle === "lft") {
      // bar.style.width = Math.max(monthWidth, monthWidth * barLength - (e.pageX - originalMouseX) + "px");
      // bar.style.left = e.pageX - originalMouseX + "px";
    }
  }

  function stopResize() {
    const newIndex = Math.floor(width / blockWidth + 0.5);
    console.log(newIndex);
    bar.style.width = newIndex * blockWidth + "px";
    setShowBlock(true);
    window.removeEventListener("mousemove", resize);
  }
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
  //     const updatedRow = updateRow(row, originalIndex, newIndex, barLength);
  //     store.dispatch(wPBarMoved(updatedRow));
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

function updateRow(row, originalIndex, newIndex, barLength) {
  const newRow = produce(row, (draft) => {
    const draftSchedule = draft.schedule; // from draft
    const movement = newIndex - originalIndex;
    const item = draftSchedule.splice(originalIndex, barLength);
    draftSchedule.splice(originalIndex + movement, 0, ...item);
  });
  return newRow;
}
