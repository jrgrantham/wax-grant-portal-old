import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import WPBlock from "./ganttTaskBlock";
import {
  leadingZero,
  monthWidth,
  moveBar,
  wpBarColor,
  resizeBar,
} from "../../helpers";

// toast.configure();

function GanttWPBar(props) {
  const [showBlock, setShowBlock] = useState(true);
  const { task, bar, wpIndex, taskIndex, barNumber } = props;
  const { leftObstruction, rightObstruction, blockCount, startIndex } = bar;

  const wpCode = leadingZero(wpIndex);
  const taskCode = leadingZero(taskIndex);
  const barCode = leadingZero(barNumber);
  const barId = "bar-" + wpCode + "-" + taskCode + "-" + barCode;

  const leftHandle =
    "handle-" + wpCode + "-" + taskCode + "-" + barCode + "-lft";
  const rightHandle =
    "handle-" + wpCode + "-" + taskCode + "-" + barCode + "-rgt";
  const blockWidth = monthWidth.slice(0, 2);

  const startPosition = startIndex * blockWidth;
  const barWidth = blockWidth * blockCount;

  const data = {
    task,
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    startPosition,
    blockCount,
    barNumber,
    setShowBlock
  };

  useEffect(() => {
    const barDiv = document.getElementById(barId);
    function handleMouseDown(e) {
      if (e.target.id.slice(0, 6) === "handle") {
        resizeBar(data, barDiv, e);
      } else moveBar(data, barDiv, e);
    }
    barDiv.addEventListener("mousedown", handleMouseDown, false);
    return () => {
      barDiv.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <Container id={barId} startPosition={startPosition}>
      {bar.map((block, index) => (
        <WPBlock
          key={index}
          task={task}
          block={block}
          blockIndex={startIndex + index}
          leftHandle={leftHandle}
          rightHandle={rightHandle}
          showBlock={showBlock}
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
  border-radius: 6px;
  z-index: 1;
  display: flex;
  &:hover .dragHandle {
    opacity: 1;
  }
  &:active .dragHandle {
    opacity: 0;
  }
`;
// export default GanttWPBar;
