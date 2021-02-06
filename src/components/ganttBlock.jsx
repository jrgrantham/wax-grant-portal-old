import React from "react";
import styled from "styled-components";
import { TiCode } from "react-icons/ti";

function GanttBlock(props) {
  const { value, status, start, end, barNumber } = props;
  // const content = start ? "S" : end ? "E" : status ? "M" : "-";
  return (
    <Container
      value={value}
      status={status}
      start={start}
      end={end}
      barNumber={barNumber}
      // color={color}
    >
      {props.status ? (
        <div className="active">
          {start ? pointerLeft : null}
          {value}
          {end ? pointerRight : null}
        </div>
      ) : null}
      {/* ) : null} */}
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
  margin: 0;
  border: 1px solid lightgrey;
  border-left: 0px solid lightgrey;
  border-right: 0.5px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;

  .active {
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

    &:hover .pointer {
      opacity: 1;
    }
  }

  .pointer {
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
    border: 1px solid black;
    border-radius: 50%;
    background-color: white;
    padding: 4px 4px 3px 4px;
  }
  .left {
    margin-left: ${(props) => (props.start ? "-35px" : 0)};
  }
  .right {
    margin-right: ${(props) => (props.end ? "-35px" : 0)};
  }
`
export default GanttBlock;
