import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function GanttBlockTrial(props) {
  // unique string for barId
  const barId = props.barId;

  // all from props
  const scheduleLength = 20;
  const blockWidth = 40;
  const barLength = 5;
  const barWidth = blockWidth * barLength;
  const prevBarIndex = 0; // needs to be the right-side index
  const leftObstructionIndex = Math.max(0, prevBarIndex);
  const nextBarIndex = 20;
  const rightObstructionIndex = Math.min(nextBarIndex - 1, scheduleLength - 1);

  useEffect(() => {
    let isDown = false;
    let offset = 0;
    let mousePosition;
    let startIndex = 0;
    let position;

    const bar = document.getElementById(barId);
    bar.addEventListener(
      "mousedown",
      function (e) {
        console.log(e.target);
        isDown = true;
        offset = bar.offsetLeft - e.clientX;
        startIndex = bar.offsetLeft / blockWidth;
      },
      true
    );

    function dropBar() {
      isDown = false;
      const blockPercent = Math.floor(position / blockWidth + 0.5);
      // fix this
      if (blockPercent !== NaN && startIndex !== blockPercent) {
        // console.log("index", startIndex, blockPercent);
      }
      bar.style.left = `${blockPercent * 40}px`;
    }

    bar.addEventListener("mouseup", dropBar, true);

    document.addEventListener("mouseup", dropBar, true);

    document.addEventListener(
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

  return (
    <Container>
      5
    </Container>
  );
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

`;
// export default GanttBlockTrial;
