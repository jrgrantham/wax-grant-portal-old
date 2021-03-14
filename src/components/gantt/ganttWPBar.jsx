import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MemoisedWPBlock } from "./ganttWPBlock";
import {
  leadingZero,
  monthWidth,
  moveBar,
  wpBarColor,
  resizeBar,
} from "../../helpers";

toast.configure();

function GanttWPBar(props) {
  const [showBlock, setShowBlock] = useState(true);
  const { row, bar, wpIndex, rowIndex, barNumber } = props;
  const { leftObstruction, rightObstruction, barLength, startIndex } = bar;

  const wpCode = leadingZero(wpIndex);
  const rowCode = leadingZero(rowIndex);
  const barCode = leadingZero(barNumber);
  const barId = "bar-" + wpCode + "-" + rowCode + "-" + barCode;

  const leftHandle =
    "handle-" + wpCode + "-" + rowCode + "-" + barCode + "-lft";
  const rightHandle =
    "handle-" + wpCode + "-" + rowCode + "-" + barCode + "-rgt";
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

  useEffect(() => {
    const barDiv = document.getElementById(barId);
    function handleMouseDown(e) {
      if (e.target.id.slice(0, 6) === "handle") {
        resizeBar(data, barDiv, e, row, barLength, setShowBlock);
      } else moveBar(data, barDiv, e, row, barLength);
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
`;
// export default GanttWPBar;
