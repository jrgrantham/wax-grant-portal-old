import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function GanttScheduleBackground() {
  const { dates } = useSelector((state) => state.project.data);

  const classNames = [
    "backgroundColumn columnLeft",
    "backgroundColumn",
    "backgroundColumn columnRight",
  ];

  const backgroundColumn = dates.map((date, i) => {
    return (
      <div key={i} className={classNames[i % 3]}>
        {date[0]}
      </div>
    );
  });

  return <Container>{backgroundColumn}</Container>;
}

export default GanttScheduleBackground;

const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  .backgroundColumn {
    height: 100%;
    width: 40px;
    background-color: rgba(100, 100, 100, 0.1);
    border-left: 1px solid rgba(100, 100, 100, 0.1);
    border-right: 1px solid rgba(100, 100, 100, 0.1);
    display: flex;
    justify-content: center;
    padding-top: 5px;
    font-weight: 500;
  }
  .columnLeft {
    border-left: 1px solid white;
  }
  .columnRight {
    border-right: 1px solid white;
  }
`;
