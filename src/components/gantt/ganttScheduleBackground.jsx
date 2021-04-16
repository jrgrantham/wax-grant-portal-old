import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
// import "react-tippy/dist/tippy.css";
// import "tippy.js/dist/tippy.css";
import {monthWidth, schedColor, schedGapColor, wpMarginBottom} from '../../helpers'

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
          <div className='monthLetter'>
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
  p {
    font-size: 18px;
    font-weight: 700;
    color: white;
  }
  .monthLetter {
    /* position: sticky; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 3px;
    padding-top: 3px;
    border-bottom: ${wpMarginBottom} solid ${schedGapColor};

  }
  .columnLeft {
    border-left: 2px solid ${schedGapColor};
  }
  .columnRight {
    border-right: 2px solid ${schedGapColor};
  }
  .backgroundColumn {
    height: 100%;
    width: ${monthWidth};
    background-color: ${schedColor};

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;
