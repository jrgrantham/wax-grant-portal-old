import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { appWidth } from "../helpers/";
import GanttChartLeft from "./ganttChartLeft";
import GanttChartRight from "./ganttChartRight";

function GanttChart() {
  const allRows = useSelector((state) => state.workPackages.data);

  // for testing ------------ could be used on other page
  const people = useSelector((state) => state.project.data.resources);
  const peoplesDays = {};
  people.forEach((person) => {
    peoplesDays[person] = 0;
    allRows.forEach((row) => {
      const percentage = row.resources[person] ? row.resources[person] : 0;
      const days = (row.days * percentage) / 100;
      if (percentage > 0) {
        peoplesDays[person] = peoplesDays[person] + days;
      }
    });
  });
  // for testing ------------ could be used on other page

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

  const daysPerMonth = [];
  let totalDays = 0;
  for (let i = 0; i < projectLength; i++) {
    let days = 0;
    for (let j = 0; j < allRows.length; j++) {
      const currentDay = allRows[j].schedule[i].value;
      days += currentDay;
      totalDays += currentDay;
    }
    daysPerMonth.push(days);
  }

  const [chartWidth, setChartWidth] = useState(0);
  useEffect(() => {
    const scheduleElement = document.getElementById("schedule").scrollWidth;
    const detailsElement = document.getElementById("details").scrollWidth;
    setChartWidth(Math.max(500, scheduleElement + detailsElement + 2));
  }, []);

  const data = {
    workPackageTitles,
    workPackages,
    deliverables,
    milestones,
    daysPerMonth,
    totalDays,
  };

  return (
    <PageContainer chartWidth={chartWidth} appWidth={appWidth}>
      <h2>Gantt Chart</h2>
      <div id="chartArea" className="chartArea">
        <GanttChartLeft data={data} />
        <GanttChartRight data={data} />
      </div>
      <div className="testPeople">
        {people.map((person, index) => {
          return (
            <div key={index} className="person">
              <span>{person}:</span>
              <span>{peoplesDays[person].toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
export default GanttChart;

const PageContainer = styled.div`
  position: relative;
  top: 30px;
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: ${(props) => props.appWidth};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  h2 {
    color: white;
    margin: 10px 0 15px 0;
  }
  .chartArea {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    max-width: ${(props) => props.chartWidth + 10}px;
    width: 100%;
  }
  .monthHeaderSpacer {
    height: 45px;
    @media screen and (max-width: 750px) {
      height: 35px;
      border-bottom: 0;
    }
  }
  .testPeople {
    min-height: 100px;
    min-width: 125px;
    z-index: 5;
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: white;
    padding: 10px;
    border: 10px solid black;
    border-radius: 10px;
    .person {
      display: flex;
      justify-content: space-between;
    }
  }
`;
