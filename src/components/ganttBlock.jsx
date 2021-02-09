import React from "react";
import styled from "styled-components";
import { TiCode } from "react-icons/ti";

function GanttBlock(props) {
  const { value, status, start, end, barNumber } = props;
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
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 40px;
  border-bottom: 1px solid grey;
  &:first-child {
    border-left: 0.5px solid lightgrey;
  }

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
      margin-right: 25px;
    }
    .end {
      margin-left: 25px;
    }

    &:hover .pointer {
      opacity: 1;
    }
  }
  .contents {
    position: static;
  }

  .pointer {
    opacity: 0;
    transition: opacity 0.3s;
    border: 1px solid black;
    border-radius: 50%;
    background-color: white;
    padding: 4px 4px 3px 4px;
    z-index: 1;
  }
  .pointer.left {
    margin-right: 4px;
  }

  .pointer.right {
    margin-left: 4px;
  }
`;
export default GanttBlock;
