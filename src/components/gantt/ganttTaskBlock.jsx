import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateTaskBlock } from "../../store/projectData/tasks";
import { wpBarColor, isNumberKey, checkZero } from "../../helpers";
import tick from "../../images/tick-white.png";

function GanttWPBlock(props) {
  const dispatch = useDispatch();
  const { leftHandle, rightHandle, block, task, blockIndex, showBlock } = props;
  const { blockNumber, value } = block;
  const blockPosition = blockNumber.slice(-1);
  const [showEditDays, setShowEditDays] = useState(false);
  const [newValue, setNewValue] = useState(value);

  // document.addEventListener("mousemove", handleMouseMove, false);
  // document.removeEventListener("mousemove", handleMouseMove);

  function handleClick() {
    setShowEditDays(true);
    // document.addEventListener("mousedown", handleMouseDown, false);
  }
  // function handleMouseDown(e) {
  //   console.log(e.target.id);
  //   if (e.target.id === "accept") {
  //     console.log("accept");
  //     acceptNewDays();
  //   } else setNewValue(value)
  //   setShowEditDays(false);
  //   document.removeEventListener("mousedown", handleMouseDown);
  // }
  function handleDayChange(e) {
    if (e.target.value) {
      const lastTwoNumbers = e.target.value.slice(-2);
      setNewValue(parseInt(lastTwoNumbers));
    } else {
      setNewValue(0);
    }
  }
  function acceptNewDays() {
    setShowEditDays(false);
    if (newValue !== value)
      dispatch(
        updateTaskBlock({
          task,
          blockIndex,
          newValue,
          oldValue: value,
        })
      );
  }

  return (
    <Container id={blockNumber}>
      {showBlock ? (
        <div>
          {showEditDays ? (
            <div className="editDays">
              <input
                autoFocus
                className="days highlight packBackground"
                type="text"
                value={newValue}
                onKeyDown={(e) => isNumberKey(e)}
                onChange={(e) => handleDayChange(e)}
              />
              <button onClick={acceptNewDays} className="accept">
                <img id="accept" src={tick} alt="accept" />
              </button>
            </div>
          ) : (
            <button
              className="days highlight packBackground"
              onClick={handleClick}
            >
              {value}
            </button>
          )}
        </div>
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
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    color: white;
    cursor: text;
  }
  img {
    max-height: 18px;
    max-width: 18px;
    cursor: pointer;
  }
  .editDays {
    position: relative;
    display: flex;
    align-items: center;
    /* border-radius: 50%; */
    z-index: 1;
    .accept {
      /* background-color: ${wpBarColor}; */
      position: absolute;
      display: flex;
      align-items: center;
      /* bottom: 6px; */
      right: -20px;
      max-width: 22px;
      max-height: 22px;
    }
  }

  .dragHandle {
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    height: 22px;
    width: 12px;
    background-color: ${wpBarColor};
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 35%;
    /* z-index: 3; */
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
