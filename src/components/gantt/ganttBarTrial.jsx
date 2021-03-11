import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MemoisedBlock } from "./ganttBlockTrial";
import { leadingZero, monthWidth, wpBarColor, moveBar } from "../../helpers";

toast.configure();

function GanttBarTrial(props) {
  // console.log(props);
  // unique string for barId
  const row = props.row;
  const bar = props.bar;
  const wpIndex = leadingZero(props.wpIndex);
  const rowIndex = leadingZero(props.rowIndex);
  const barNumber = leadingZero(props.barNumber);
  const barId = "bar" + "-" + wpIndex + "-" + rowIndex + "-" + barNumber;
  const leftHandle = barId + "left";
  const rightHandle = barId + "right";
  const blockWidth = monthWidth.slice(0, 2);
  // console.log(barId);

  // all from props
  const barLength = props.bar.barLength;
  const firstBlockIndex = props.bar.startIndex;
  const startPosition = firstBlockIndex * blockWidth;

  const scheduleLength = 20;
  const barWidth = blockWidth * barLength;
  const prevBarIndex = 0; // needs to be the right-side index
  const leftObstructionIndex = Math.max(0, prevBarIndex);
  const nextBarIndex = 15;
  const rightObstructionIndex = Math.min(nextBarIndex - 1, scheduleLength - 1);

  const data = {
    barId,
    blockWidth,
    leftObstructionIndex,
    rightObstructionIndex,
    barWidth,
  };

  function reSize(bar, e) {
    let originalMouseX = e.pageX;
    let originalWidth = bar.style;
    console.log(originalWidth);
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    let handle = e.target.id.slice(-1) === "e" ? "end" : "start";
    console.log(handle);
    function resize(e) {
      if (handle === "end") {
        console.log(e.clientX);
        bar.style.width = e.pageX - bar.getBoundingClientRect().left + "px";
      } else if (handle === "start") {
        bar.style.width = 200 - (e.pageX - originalMouseX) + "px";
        bar.style.left = e.pageX - originalMouseX + "px";
      }
    }

    function stopResize() {
      window.removeEventListener("mousemove", resize);
      // jump to position
    }
  }

  useEffect(() => {
    const bar = document.getElementById(barId);
    bar.addEventListener(
      "mousedown",
      function (e) {
        console.log(e.target.id);
        moveBar(data, bar, e);
        // if (e.target.id.slice(-1) === "m") moveBar(data, bar, e);
        // else if (e.target.id.slice(-1) === "s" || e.target.id.slice(-1) === "e")
        //   reSize(bar, e);
      },
      true
    );
  });

  return (
    <Container id={barId} startPosition={startPosition}>
      {bar.map((block, index) => (
        <MemoisedBlock
          key={index}
          row={row}
          block={block}
          // barId={barId}
          blockIndex={firstBlockIndex + index}
          leftHandle={leftHandle}
          rightHandle={rightHandle}
        />
      ))}
    </Container>
  );
}
export const MemoisedBar = React.memo(GanttBarTrial);

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.startPosition}px;
  margin: 2px 0;
  background-color: ${wpBarColor};
  color: white;
  border-radius: 5px;
  z-index: 10;
  display: flex;
`;
// export default GanttBarTrial;
