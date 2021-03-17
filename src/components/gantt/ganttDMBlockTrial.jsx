import React, { useEffect } from "react";
import styled from "styled-components";

import {
  monthWidth,
  delTitleColor,
  milTitleColor,
  rowHeight,
  leadingZero,
  moveBlock,
} from "../../helpers";

function GanttDMBlock(props) {
  const { prefix, rowIndex, index, scheduleLength, row } = props;
  const reference = prefix + (rowIndex + 1);
  const blockId = "Block-" + prefix + "-" + leadingZero(rowIndex + 1);
  const blockColor = prefix === "D" ? delTitleColor : milTitleColor;
  const blockWidth = monthWidth.slice(0, 2);
  const position = blockWidth * index + "px";

  const data = {
    scheduleLength,
    blockWidth,
    position,
    row,
  };

  useEffect(() => {
    const blockDiv = document.getElementById(blockId);
    function handleMouseDown(e) {
      moveBlock(data, e, blockDiv);
    }
    blockDiv.addEventListener("mousedown", handleMouseDown, false);
    return () => {
      blockDiv.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <Container blockColor={blockColor} id={blockId} position={position}>
      <p className="active">{reference}</p>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.position};
  width: ${monthWidth};
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${rowHeight};
  z-index: 1;
  color: white;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;

    border: 1px solid ${(props) => props.blockColor};
    border-radius: 6px;
    background-color: ${(props) => props.blockColor};
    z-index: 1;
  }
`;
export default GanttDMBlock;
