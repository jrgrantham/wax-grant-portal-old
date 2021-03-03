import React, { useEffect } from "react";
import styled from "styled-components";

import GanttScheduleBackground from "../components/gantt/ganttScheduleBackground";
import GanttWorkPackageSchedule from "../components/gantt/ganttPackSchedule";

function GanttChartRight(props) {
  const {
    workPackages,
    deliverables,
    milestones,
    daysPerMonth,
  } = props.data;

  useEffect(() => {
    const slider = document.querySelector(".right");
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener("mousedown", (e) => {
      if (e.target.className.includes("backgroundColumn")) {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      }
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      // const walk = (x - startX) * 3; //scroll-fast
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    });
  }, []);

  return (
    <PageContainer>
      <div id="schedule" className="right">
        <div className="inner">
          <GanttScheduleBackground />
          <div className="months"></div>
          {workPackages.length
            ? workPackages.map((row, index) => {
                return (
                  <GanttWorkPackageSchedule key={index} workPackData={row} />
                );
              })
            : null}
          <div className="divider totals">
            {daysPerMonth.map((month, index) => {
              return (
                <div key={index} className="block">
                  <h3>{month ? month : null}</h3>
                </div>
              );
            })}
          </div>

          <GanttWorkPackageSchedule workPackData={deliverables} prefix={"D"} />
          <GanttWorkPackageSchedule workPackData={milestones} prefix={"M"} />
        </div>
      </div>
    </PageContainer>
  );
}

export default GanttChartRight;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: auto;
  width: 100%;
  border-left: 1px solid rgba(250, 250, 250, 0.5);
  border-right: 1px solid rgba(250, 250, 250, 0.5);
  border-radius: 4px;
  @media screen and (max-width: 550px) {
    display: none;
  }
  .inner {
    position: relative;
  }

  .divider {
    /* border: 1px solid red; */
    height: 50px;
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .totalDays {
      width: 80px;
    }
    .totalDays.content {
      /* position: relative; */
      /* top: -10px; */
      height: 30px;
      padding-right: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      /* border: 1px solid white; */
      color: rgba(255, 255, 255, 0.6);
    }
    button {
      height: 30px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .totals {
    display: flex;
    align-items: flex-start;
    /* border: 1px solid white; */
    .block {
      width: 40px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      /* border: 1px solid red */
    }
  }
  .empty {
    height: 70px;
    button {
      width: 400px;
    }
  }
  .months {
    /* width: 100%; */
    height: 45px;
    /* border-bottom: 10px solid rgba(250, 250, 250, 0.25); */
    @media screen and (max-width: 750px) {
      height: 35px;
      border-bottom: 0;
    }
    @media screen and (max-width: 550px) {
      display: none;
    }
  }
  .divider {
    /* border: 1px solid red; */
    height: 50px;
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .totalDays {
      width: 80px;
    }
    .totalDays.content {
      /* position: relative; */
      /* top: -10px; */
      height: 30px;
      padding-right: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      /* border: 1px solid white; */
      color: rgba(255, 255, 255, 0.6);
    }
    button {
      height: 30px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .totals {
    display: flex;
    align-items: flex-start;
    /* border: 1px solid white; */
    .block {
      width: 40px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      /* border: 1px solid red */
    }
  }
  .empty {
    height: 70px;
    button {
      width: 400px;
    }
  }
`;
