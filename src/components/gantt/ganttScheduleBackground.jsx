import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

function GanttScheduleBackground() {
  const { dates } = useSelector((state) => state.project.data);

  const classNames = [
    "backgroundColumn columnLeft",
    "backgroundColumn",
    "backgroundColumn columnRight",
  ];

  const toolTip = <div className='tooltip'>text here</div>;

  const backgroundColumn = dates.map((date, i) => {
    return (
      <div key={i} className={classNames[i % 3]}>
        {/* <div className='month'> */}
        <Tippy content={toolTip}>
          <p>{date[0]}</p>
        </Tippy>
        {/* </div> */}
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
  font-weight: 500;
  color: white;
  .month {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: darkorange;
    border-radius: 50%;
  }
  .backgroundColumn {
    height: 100%;
    width: 40px;
    background-color: rgba(100, 100, 100, 0.1);
    border-left: 1px solid rgba(100, 100, 100, 0.1);
    border-right: 1px solid rgba(100, 100, 100, 0.1);
    border-radius: 10px 10px 0 0;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5px;
  }
  .columnLeft {
    border-left: 1px solid white;
  }
  .columnRight {
    border-right: 1px solid white;
  }

  .tooltip {
    background-color: black;
    color: white;
  }
`;
