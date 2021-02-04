import React from "react";
import styled from "styled-components";

function GanttBlock(props) {
  const { value, status, start, end, color } = props;
  return (
    <Container
      value={value}
      status={status}
      start={start}
      end={end}
      color={color}
    >
      {props.status ? (
        <div className="active">
          {value ? <p>{value}</p> : null}
        </div>
      // ) : <p>-</p>}
      ) : null}
    </Container>
  );
}

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
    margin-top: 15%;
    margin-bottom: 15%;
    width: 100%;
    height: 70%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    background-color: ${(props) => props.color};
    margin-left: ${(props) => (props.start ? "15%" : 0)};
    margin-right: ${(props) => (props.end ? "15%" : 0)};

    border-left: ${(props) => (props.start ? "1px solid black" : 0)};
    border-top: ${(props) => (props.status ? "1px solid black" : 0)};
    border-bottom: ${(props) => (props.status ? "1px solid black" : 0)};
    border-right: ${(props) => (props.end ? "1px solid black" : 0)};

    border-top-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-top-right-radius: ${(props) => (props.end ? "25%" : 0)};
    border-bottom-left-radius: ${(props) => (props.start ? "25%" : 0)};
    border-bottom-right-radius: ${(props) => (props.end ? "25%" : 0)};
  }
`;

export default GanttBlock;
