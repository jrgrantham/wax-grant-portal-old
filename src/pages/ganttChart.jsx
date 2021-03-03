import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { appWidth } from "../helpers/";
import GanttChartLeft from "./ganttChartLeft";
import GanttChartRight from "./ganttChartRight";

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

  const daysPerMonth = [];
  let totalDays = 0;
  for (let i = 0; i < projectLength; i++) {
    let days = 0;
    allRows.forEach((row) => {
      days += row.schedule[i].value;
      totalDays += row.schedule[i].value;
    });
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
    </PageContainer>
  );
}
export default GanttChart;

const PageContainer = styled.div`
  position: relative;
  top: 30px;
  margin: auto;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${(props) => props.appWidth};
  @media screen and (max-width: 750px) {
    padding: 0px;
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
  }
`;
