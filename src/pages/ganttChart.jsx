import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import GanttScheduleBackground from "../components/gantt/ganttScheduleBackground";
import GanttPackWork from "../components/gantt/ganttPackWork";
import GanttPackDelsMils from "../components/gantt/ganttPackDelsMils";
import GanttWorkPackageSchedule from "../components/gantt/ganttPackSchedule";
import { wPRowAdded } from "../store/projectData/workPackages";
import {
  appWidth,
  wpTitleColor,
  delTitleColor,
  milTitleColor,
} from "../helpers/";

function GanttChart() {
  const allRows = useSelector((state) => state.workPackages.data);

  function groupByTitle(titles, data) {
    const groupedWork = [];
    titles.forEach((title) => {
      const group = data.filter(
        (workPack) => workPack.workPackageTitle === title
      );
      groupedWork.push(group);
    });
    return groupedWork;
  }

  const workPackageTitles = [
    ...new Set(
      allRows
        .map((workPackage) => workPackage.workPackageTitle)
        .sort((a, b) => a - b)
    ),
  ];

  const workPackages = groupByTitle(workPackageTitles, allRows);
  const deliverables = useSelector((state) =>
    state.delsAndMils.data.filter((row) => row.type === "deliverable")
  );
  const milestones = useSelector((state) =>
    state.delsAndMils.data.filter((row) => row.type === "milestone")
  );

  const projectLength = useSelector(
    (state) => state.project.data.projectLength
  );
  const dispatch = useDispatch();
  function createNewWorkPackage() {
    dispatch(wPRowAdded({ projectLength }));
  }

  const monthDays = [];
  let totalDays = 0;
  for (let i = 0; i < projectLength; i++) {
    let days = 0;
    allRows.forEach((row) => {
      days += row.schedule[i].value;
      totalDays += row.schedule[i].value;
    });
    monthDays.push(days);
  }
  console.log(totalDays);

  const [chartWidth, setChartWidth] = useState(0);
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

    const scheduleElement = document.getElementById("schedule").scrollWidth;
    const detailsElement = document.getElementById("details").scrollWidth;
    setChartWidth(Math.max(500, scheduleElement + detailsElement + 2));
  }, []);

  return (
    <PageContainer chartWidth={chartWidth} appWidth={appWidth}>
      <h2>Gantt Chart</h2>
      <div id="chartArea" className="chartArea">
        <div id="details" className="left">
          <div className="months"></div>
          {workPackages.length
            ? workPackages.map((row, index) => {
                return (
                  <GanttPackWork
                    key={index}
                    workPackData={row}
                    titleBarColor={wpTitleColor}
                    title={workPackageTitles[index]}
                    allTitles={workPackageTitles}
                  />
                );
              })
            : null}
          <div className="divider">
            <div className="totalDays" />
            <button onClick={createNewWorkPackage}>Add Work Package</button>
            <div className="totalDays content">
              <h3>{totalDays}</h3>
            </div>
          </div>
          <GanttPackDelsMils
            workPackData={deliverables}
            titleBarColor={delTitleColor}
            title={"Deliverables"}
          />
          <GanttPackDelsMils
            workPackData={milestones}
            titleBarColor={milTitleColor}
            title={"Milestones"}
          />
        </div>

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
              {monthDays.map((month, index) => {
                return (
                  <div key={index} className="block">
                    <h3>{month ? month : null}</h3>
                  </div>
                );
              })}
            </div>

            <GanttWorkPackageSchedule
              workPackData={deliverables}
              prefix={"D"}
            />
            <GanttWorkPackageSchedule workPackData={milestones} prefix={"M"} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default GanttChart;

const PageContainer = styled.div`
  position: relative;
  top: 30px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 10px;
  max-width: ${(props) => props.appWidth};
  @media screen and (max-width: 750px) {
    padding: 0px;
    width: 100%;
  }
  h2 {
    color: white;
    margin: 10px 0 15px 0;
  }

  .chartArea {
    display: flex;
    justify-content: center;
    max-width: ${(props) => props.chartWidth + 10}px;
    width: 100%;
    @media screen and (max-width: 750px) {
      justify-content: center;
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
  .left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
    @media screen and (max-width: 550px) {
      margin-right: 0;
      width: 100%;
    }
  }
  .right {
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
