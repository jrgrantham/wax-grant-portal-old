import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MemoisedBlock } from "./ganttBlockTrial";
import { leadingZero, monthWidth, wpBarColor, moveBar } from "../../helpers";

toast.configure();

function GanttBarTrial(props) {
  // unique string for barId
  const wpIndex = leadingZero(props.wpIndex);
  const rowIndex = leadingZero(props.rowIndex);
  const barNumber = leadingZero(props.barNumber);
  const barId = "bar" + wpIndex + rowIndex + barNumber;
  const leftHandle = barId + "left";
  const rightHandle = barId + "right";

  // all from props
  const blockWidth = monthWidth.slice(0, 2);
  const barLength = 5;
  const firstBlockIndex = 0;
  const startPosition = firstBlockIndex * blockWidth;

  const blocks = [];
  for (let i = 0; i < barLength; i++) {
    let blockNum = leadingZero(i);
    if (i === 0) blockNum = blockNum + "s";
    else if (i === barLength - 1) blockNum = blockNum + "e";
    else blockNum = blockNum + "m";
    const blockId = barId + blockNum;
    blocks.push(blockId);
  }

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

  function reSize() {
    const bar = document.getElementById(barId);
    const dragHandles = document.querySelectorAll(".dragHandle");
    console.log(dragHandles.length);
    for (let i = 0; i < dragHandles.length; i++) {
      const currentResizer = dragHandles[i];
      currentResizer.addEventListener("mousedown", function (e) {
        console.log(e.target);
        e.preventDefault();
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
      });

      function resize(e) {
        console.log(currentResizer);
        if (currentResizer.id ) {
          bar.style.width =
            e.pageX - bar.getBoundingClientRect().left + "px";
        }
      }

      function stopResize() {
        window.removeEventListener("mousemove", resize);
      }
    }
  }

  useEffect(() => {
    moveBar(data);
    reSize();
  });

  return (
    <Container id={barId} startPosition={startPosition}>
      {blocks.map((block, index) => (
        <MemoisedBlock
          blockId={block}
          key={index}
          barId={barId}
          index={index}
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
