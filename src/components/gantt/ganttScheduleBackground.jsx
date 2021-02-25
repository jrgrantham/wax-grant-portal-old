import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import "react-tippy/dist/tippy.css";
// import "tippy.js/dist/tippy.css";

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
        <Tippy delay={250} content={date}>
          <p>{date[0]}</p>
        </Tippy>
      </div>
    );
  });

  return <Container>{backgroundColumn}</Container>;
}

export default GanttScheduleBackground;

const Container = styled.div`
  position: absolute;
  display: flex;
  height: calc(100% - 10px);
  border-radius: 10px;
  overflow: hidden;
  p {
    font-size: 18px;
    font-weight: 700;
    color: white;
    /* cursor: pointer; */
  }
  .backgroundColumn {
    height: 100%;
    width: 40px;
    background-color: rgba(10, 10, 10, 0.1 );
    border-left: 1px solid rgba(250, 250, 250, 0.2);
    border-right: 1px solid rgba(250, 250, 250, 0.2);

    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5px;
  }
  .columnLeft {
    border-left: 1px solid rgba(250, 250, 250, 0.5);
    border-radius: 10px 0 0 0;
  }
  .columnRight {
    border-right: 1px solid rgba(250, 250, 250, 0.5);
    border-radius: 0 10px 0 0;
  }
`;
