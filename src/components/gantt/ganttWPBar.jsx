import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MemoisedWPBlock } from "./ganttWPBlock";
import { leadingZero, monthWidth, moveBar, wpBarColor } from "../../helpers";
import { useDispatch } from "react-redux";
import { wPBarMoved } from "../../store/projectData/workPackages";
import produce from "immer";

toast.configure();

function GanttWPBar(props) {
  const dispatch = useDispatch();
  const { row, bar, wpIndex, rowIndex, barNumber } = props;
  // console.log(bar.barLength);
  const { leftObstruction, rightObstruction, barLength, startIndex } = bar;

  const wpCode = leadingZero(wpIndex);
  const rowCode = leadingZero(rowIndex);
  const barCode = leadingZero(barNumber);
  const barId = "bar" + "-" + wpCode + "-" + rowCode + "-" + barCode;

  const leftHandle = barId + "left";
  const rightHandle = barId + "right";
  const blockWidth = monthWidth.slice(0, 2);
  const startPosition = startIndex * blockWidth;
  const barWidth = blockWidth * barLength;

  const data = {
    barId,
    blockWidth,
    leftObstruction,
    rightObstruction,
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
    }
  }

  useEffect(() => {
    const barDiv = document.getElementById(barId);
    function handleMouseDown(e) {
      moveBar(data, barDiv, e, row, barLength);
    }
    barDiv.addEventListener("mousedown", handleMouseDown, false);
    return () => {
      barDiv.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <Container id={barId} startPosition={startPosition}>
      {bar.map((block, index) => (
        <MemoisedWPBlock
          key={index}
          row={row}
          block={block}
          // barId={barId}
          blockIndex={startIndex + index}
          leftHandle={leftHandle}
          rightHandle={rightHandle}
        />
      ))}
    </Container>
  );
}
// export const MemoisedBar = React.memo(GanttWPBar);
export default GanttWPBar;

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.startPosition}px;
  margin: 2px 0;
  background-color: ${wpBarColor};
  color: white;
  border-radius: 6px;
  z-index: 1;
  display: flex;
  &:hover .dragHandle {
    opacity: 1;
  }
`;
// export default GanttWPBar;
