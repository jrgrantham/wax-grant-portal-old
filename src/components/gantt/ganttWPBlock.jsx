import React from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { wPBlockUpdated } from "../../store/projectData/workPackages";
import { wpBarColor, isNumberKey, checkZero } from "../../helpers";

function GanttWPBlock(props) {
  const dispatch = useDispatch();
  const { leftHandle, rightHandle, block, row, blockIndex, showBlock } = props;
  const { blockNumber, value } = block;
  const blockPosition = blockNumber.slice(-1);

  function onchangeHandler(e) {
    const lastTwoNumbers = e.target.value.slice(-2);
    const newValue = parseInt(lastTwoNumbers);
    dispatch(
      wPBlockUpdated({
        row,
        blockIndex,
        newValue,
        oldValue: value,
      })
    );
  }

  return (
    <Container id={blockNumber}>
      {showBlock ? (
        <input
          type="text"
          value={value}
          onKeyDown={(e) => isNumberKey(e)}
          onChange={(e) => onchangeHandler(e)}
          onBlur={() => checkZero(value)}
        />
      ) : null}
      {blockPosition === "s" ? (
        <div id={leftHandle} className="dragHandle left" />
      ) : null}
      {blockPosition === "e" ? (
        <div id={rightHandle} className="dragHandle right" />
      ) : null}
      {blockPosition === "x" ? (
        <>
          <div id={leftHandle} className="dragHandle left" />
          <div id={rightHandle} className="dragHandle right" />
        </>
      ) : null}
    </Container>
  );
}
export default GanttWPBlock;
// export const MemoisedWPBlock = React.memo(GanttWPBlock);

const Container = styled.div`
  flex-grow: 1;
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  input {
    text-align: center;
    width: 20px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: ${wpBarColor};
    color: white;
    z-index: 1;
  }

  .dragHandle {
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    height: 20px;
    width: 10px;
    background-color: ${wpBarColor};
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    z-index: 3;
    cursor: col-resize;
  }
  .right {
    margin-left: 39px;
  }
  .left {
    margin-right: 39px;
  }
`;
// export default GanttWPBlock;
