import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { monthWidth } from "../../helpers";

toast.configure();

function GanttBlockTrial(props) {
  // unique string for barId
  const barId = props.barId;
  const blockId = props.blockId;
  const index = props.index;

  // all from props
  const scheduleLength = 20;
  const blockWidth = monthWidth.slice(0, 2);
  const barLength = 5;
  const barWidth = blockWidth * barLength;
  const prevBarIndex = 0; // needs to be the right-side index
  const leftObstructionIndex = Math.max(0, prevBarIndex);
  const nextBarIndex = 15;
  const rightObstructionIndex = Math.min(nextBarIndex - 1, scheduleLength - 1);

  useEffect(() => {
    let isDown = false;
    let offset = 0;
    let mousePosition;
    let startIndex = 0;
    let position = 0;
    let movedBar = "";

    const bar = document.getElementById(barId);
    const block = document.getElementById(blockId);
    bar.addEventListener(
      "mousedown",
      function (e) {
        movedBar = e.target.id.slice(0, 9);
        if (e.target.id.slice(-1) === "m") isDown = true;
        offset = bar.offsetLeft - e.clientX;
        startIndex = bar.offsetLeft / blockWidth;
      },
      true
    );

    function dropBar() {
      isDown = false;
      const newBlockIndex = Math.floor(position / blockWidth + 0.5);
      // fix this
      if (index === 0 && startIndex !== newBlockIndex) {
        console.log(barId, movedBar);
        // this to trigger sending to redux / server
      }
      bar.style.left = `${newBlockIndex * 40}px`;
    }

    bar.addEventListener("mouseup", dropBar, true);
    bar.addEventListener("mouseleave", dropBar, true);
    // document.addEventListener("mouseup", dropBar, true);

    bar.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = event.clientX;
          position = Math.min(
            Math.max(mousePosition + offset, leftObstructionIndex * blockWidth),
            (rightObstructionIndex + 1) * blockWidth - barWidth
          );
          bar.style.left = position + "px";
        }
      },
      true
    );
  });

  return <Container id={blockId}>5</Container>;
}
export const MemoisedBlock = React.memo(GanttBlockTrial);

const Container = styled.div`
  width: 40px;
  height: 36px;
  background-color: black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
`;
// export default GanttBlockTrial;
