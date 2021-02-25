import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { wPBlockUpdated } from "../../store/projectData/workPackages";
import { isNumberKey } from "../../helpers";

toast.configure();

function GanttBlock(props) {
  console.log("block");
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
        // autoClose: false,
      });
    }
  }

  return (
    <Container
      value={value}
      status={status}
      start={start}
      end={end}
      barNumber={barNumber}
    >
      {props.status ? (
        <div className="active">
          <div
            className={
              start && end
                ? "value single"
                : start
                ? "value start"
                : end
                ? "value end"
                : "value"
            }
          >
            {isWP ? (
              <input
                type="text"
                value={value}
                // pattern="[0-9]"
                onKeyDown={(e) => isNumberKey(e)}
                onChange={(e) => onchangeHandler(e)}
                onBlur={() => checkZero(value)}
                // onBlur={onblurHandler} send to server?
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
  height: 50px;
  width: 40px;

  input {
    text-align: center;
    width: 20px;
    padding: 0;
    border: none;
  }
  .active {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 10%;
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
`;
// export default GanttBlock;
export const MemoisedBlock = React.memo(GanttBlock);
