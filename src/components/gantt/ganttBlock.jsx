import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { wPBlockUpdated } from "../../store/projectData/workPackages";
import { isNumberKey } from "../../helpers";

toast.configure();

function GanttBlock(props) {
  // console.log("block");
  const dispatch = useDispatch();
  const {
    value,
    status,
    start,
    end,
    barNumber,
    nonWPPrefix,
    rowIndex,
    row,
    isWP,
    index,
  } = props;
  const reference = nonWPPrefix + (rowIndex + 1);
  const blockId = "block" + rowIndex + index;

  function onchangeHandler(e) {
    const lastTwoNumbers = e.target.value.slice(-2);
    const newValue = parseInt(lastTwoNumbers);
    dispatch(
      wPBlockUpdated({
        row,
        blockIndex: index,
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

  const [dragBarDisplay, setDragBarDisplay] = useState("none");

  function showBar(e) {
    if (e.target.id === blockId) {
      setDragBarDisplay("flex");
      setTimeout(() => {
        setDragBarDisplay("none");
      }, 2000);
    }
  }

  return (
    <Container
      value={value}
      status={status}
      start={start}
      end={end}
      barNumber={barNumber}
      dragBarDisplay={dragBarDisplay}
    >
      {status && !start && !end ? (
        <div className="dragBar" id={`${blockId}dragBar`}>
          <p>drag to move bar</p>
        </div>
      ) : null}
      {start ? <div className="arrow left"></div> : null}
      {end ? <div className="arrow right"></div> : null}
      {status ? (
        <div className="active" id={blockId} onMouseDown={showBar}>
          <div
            className={
              start && end
                ? "value single"
                : start
                ? "value start"
                : end
                ? "value end"
                : "value middle"
            }
          >
            {isWP ? (
              <input
                type="text"
                value={value}
                onKeyDown={(e) => isNumberKey(e)}
                onChange={(e) => onchangeHandler(e)}
                onBlur={() => checkZero(value)}
              />
            ) : (
              <p>{reference}</p>
            )}
          </div>
        </div>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  z-index: -1;
  &:hover .arrow {
    opacity: 1
  }

  input {
    text-align: center;
    width: 20px;
    padding: 0;
    border: none;
    z-index: 1;
  }
  .active {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: ${(props) => (props.start ? "2px" : 0)};
    margin-right: ${(props) => (props.end ? "2px" : 0)};

    border-left: ${(props) => (props.start ? "1px solid #909090" : 0)};
    border-top: ${(props) => (props.status ? "1px solid #909090" : 0)};
    border-bottom: ${(props) => (props.status ? "1px solid #909090" : 0)};
    border-right: ${(props) => (props.end ? "1px solid #909090" : 0)};

    border-top-left-radius: ${(props) => (props.start ? "6px" : 0)};
    border-top-right-radius: ${(props) => (props.end ? "6px" : 0)};
    border-bottom-left-radius: ${(props) => (props.start ? "6px" : 0)};
    border-bottom-right-radius: ${(props) => (props.end ? "6px" : 0)};

    background-color: white;
    z-index: 1;

    &:hover .pointer {
      opacity: 1;
    }
  }
  .dragBar {
    display: ${(props) => props.dragBarDisplay};
    width: 120px;
    height: 32px;
    position: absolute;
    z-index: 20;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: black;
    color: white;
    font-weight: 700;
  }
  .arrow {
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: white;
    border: 1px solid black;
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
// export default GanttBlock;
export const MemoisedBlock = React.memo(GanttBlock);
