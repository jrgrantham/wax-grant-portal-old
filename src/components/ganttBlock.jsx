import React from "react";
import styled from "styled-components";
import { TiCode } from "react-icons/ti";

function GanttBlock(props) {
  const { value, status, start, end, barNumber } = props;
  const movement = 21;
  // const content = start ? "S" : end ? "E" : status ? "M" : "-";
  return (
    <Container
      value={value}
      status={status}
      start={start}
      end={end}
      barNumber={barNumber}
      movement={movement}
      // color={color}
    >
      {props.status ? (
        <div className="active" start>
          {start ? pointerLeft : null}
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
            {value}
          </div>
          {end ? pointerRight : null}
        </div>
      ) : // ) : <p>{end}</p>}
      null}
    </Container>
  );
}

const pointerLeft = (
  <div className="pointer left">
    <TiCode />
  </div>
);

const pointerRight = (
  <div className="pointer right">
    <TiCode />
  </div>
);

const Container = styled.div`
  /* position: absolute; */
  margin: 0;
  border: 1px solid #e5e5e5;
  border-left: 0.5px solid #e5e5e5;
  border-right: 0.5px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  &:first-child {
    /* border-left: 0.5px solid lightgrey; */
  }

  .active {
    /* position: static; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15%;
    margin-bottom: 15%;
    width: 100%;
    height: 70%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    /* background-color: ${(props) => props.color}; */
    /* use rgb and set opacity for background, not for border */
    margin-left: ${(props) => (props.start ? "2px" : 0)};
    margin-right: ${(props) => (props.end ? "2px" : 0)};

    border-left: ${(props) => (props.start ? "1px solid #909090" : 0)};
    border-top: ${(props) => (props.status ? "1px solid #909090" : 0)};
    border-bottom: ${(props) => (props.status ? "1px solid #909090" : 0)};
    border-right: ${(props) => (props.end ? "1px solid #909090" : 0)};

    border-top-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-top-right-radius: ${(props) => (props.end ? "25%" : 0)};
    border-bottom-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-bottom-right-radius: ${(props) => (props.end ? "25%" : 0)};

    .start {
      margin-right: 35px;
    }
    .end {
      margin-left: 35px;
    }

    &:hover .pointer {
      opacity: 1;
    }
  }
  .contents {
    position: static;
  }

  .pointer {
    /* position: absolute; */
    opacity: 0;
    transition: opacity 0.3s;
    border: 1px solid black;
    border-radius: 50%;
    background-color: white;
    padding: 4px 4px 3px 4px;
  }
  .left {
    margin-right: 12px;
  }

  .right {
    margin-left: 12px;
  }
`;
export default GanttBlock;
