import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function GanttBarTrial(props) {
  // unique string for barId
  let wpIndex = props.wpIndex.toString();
  wpIndex = props.wpIndex < 10 ? 0 + wpIndex : wpIndex;
  let rowIndex = props.rowIndex.toString();
  rowIndex = props.rowIndex < 10 ? 0 + rowIndex : rowIndex;
  let barNumber = props.barNumber.toString();
  barNumber = props.barNumber < 10 ? 0 + barNumber : barNumber;
  const barId = 'bar' + wpIndex + rowIndex + barNumber;

  // all from props
  const scheduleLength = 20;
  const blockWidth = 40;
  const barLength = 5;
  const barWidth = blockWidth * barLength;
  const prevBarIndex = 0; // needs to be the right-side index
  const leftObstructionIndex = Math.max(0, prevBarIndex);
  const nextBarIndex = 20;
  const rightObstructionIndex = Math.min(nextBarIndex - 1, scheduleLength - 1);
  const firstBlockIndex = 0;
  const startPosition = firstBlockIndex * blockWidth;

  const blocks = [];
  for (let i = 0; i < barLength; i++) {
    const blockNum = i.toString();
    if (i < 10) {
      blockNum = 0 + blockNum;
    }
    if (i === 0) blockNum = blockNum + 's';
    else if (i === barLength - 1) blockNum = blockNum + "e";
    else blockNum = blockNum + "m";

    // needs WP number too
    const blockId = barId + blockNum;
    console.log(blockId);
    blocks.push(
      <div key={i} id={blockId} className="block">
        5
      </div>
    );
  }

  useEffect(() => {
    let isDown = false;
    let offset = 0;
    let mousePosition;
    let startIndex = 0;
    let position;

    const bar = document.getElementById(barId);
    console.log(bar);
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
        console.log("index", startIndex, blockPercent);
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
    <Container
      id={barId}
      barWidth={barWidth}
      startPosition={startPosition}
    >
      {blocks}
    </Container>
  );
}
export const MemoisedBar = React.memo(GanttBarTrial);

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.startPosition}px;
  margin: 2px 0;
  /* height: 36px; */
  /* width: ${(props) => props.barWidth}px; */
  background-color: black;
  color: white;
  border-radius: 5px;
  z-index: 10;
  display: flex;
  .block {
    width: 40px;
    height: 36px;
    background-color: black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
// export default GanttBarTrial;
