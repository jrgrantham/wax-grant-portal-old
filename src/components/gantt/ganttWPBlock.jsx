import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { wPBlockUpdated } from "../../store/projectData/workPackages";
import { wpBarColor } from "../../helpers";

toast.configure();

function GanttWPBlock(props) {
  const dispatch = useDispatch();
  // unique string for barId
  const { leftHandle, rightHandle, block, row, blockIndex } = props;
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

  function checkZero(value) {
    if (value === 0) {
      toast.info("zero days entered", {
        // success, info, warn, error
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }

  return (
    <Container id={blockNumber}>
      <input
        type="text"
        value={value}
        // onKeyDown={(e) => isNumberKey(e)}
        onChange={(e) => onchangeHandler(e)}
        onBlur={() => checkZero(value)}
      />
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
export const MemoisedWPBlock = React.memo(GanttWPBlock);

const Container = styled.div`
  flex-grow: 1;
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;

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
    height: 18px;
    width: 18px;
    background-color: ${wpBarColor};
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    z-index: 3;
  }
  .right {
    margin-left: 35px;
  }
  .left {
    margin-right: 35px;
  }
`;
// export default GanttWPBlock;
