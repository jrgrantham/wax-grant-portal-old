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
        {/* <Tippy content={date}> */}
        <Tippy delay={250} content={date}>
          <div className='monthInitial'>
            <p>{date[0]}</p>
          </div>
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
  /* overflow: hidden; */
  border-radius: 4px;
  border-right: 2px solid rgba(250, 250, 250, 0.5);
  p {
    font-size: 18px;
    font-weight: 700;
    color: white;
  }
  .monthInitial {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 3px;
    padding-top: 3px;
    border-bottom: 10px solid rgba(250, 250, 250, 0.25);

  }
  .columnLeft {
    border-left: 1px solid rgba(250, 250, 250, 0.5);
    border-radius: 5px 0 0 0;
  }
  .columnRight {
    border-right: 1px solid rgba(250, 250, 250, 0.5);
    border-radius: 0 5px 0 0;
  }
  .backgroundColumn {
    height: 100%;
    width: 40px;
    background-color: rgba(10, 10, 10, 0.1);
    border-top: 1px solid rgba(250, 250, 250, 0.5);

    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* padding-top: 5px; */
    @media screen and (max-width: 750px) {
      border-radius: 0;
    }
  }
`;
