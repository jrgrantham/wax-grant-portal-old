import React from "react";
import styled from "styled-components";

import {
  monthWidth,
  delTitleColor,
  milTitleColor,
  rowHeight,
} from "../../helpers";

function GanttDMBlock(props) {
  const {
    status,
    prefix,
    rowIndex,
    index,
  } = props;

  const reference = prefix + (rowIndex + 1);
  const blockId = "block" + rowIndex + index;
  const blockColor = prefix === "D" ? delTitleColor : milTitleColor;

  return (
    <Container blockColor={blockColor}>
      {status ? (
        <div className="active" id={blockId}>
          <p>{reference}</p>
        </div>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  position: static;
  width: ${monthWidth};
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${rowHeight};
  z-index: -1;
  color: white;

  .active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.blockColor};
    border-radius: 6px;
    background-color: ${(props) => props.blockColor};
    z-index: 1;
  }
`;
// export default GanttDMBlock;
export const MemoisedBlock = React.memo(GanttDMBlock);
