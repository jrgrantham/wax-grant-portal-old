import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { appTop, appWidth, wpMarginBottom, getResources } from "../helpers/";
import GanttChartLeft from "../components/gantt/ganttChartLeft";
import GanttChartRight from "../components/gantt/ganttChartRight";
// import { allResources } from "../store";

function GanttChart() {

  const allTasks = useSelector((state) => state.tasks.data);
  // for testing ------------ could be used on other page
  const people = useSelector((state) => state.team.data);
  const resources = getResources();
  const peoplesDays = {};
  people.forEach((person) => {
    const initials = person.acronym;
    peoplesDays[initials] = 0;
    allTasks.forEach((task) => {
      let percentage = 0;
      if (resources[task.taskId][initials] !== undefined) {
        percentage = resources[task.taskId][initials].percent;
      }
      if (percentage > 0) {
        const days = (task.days * percentage) / 100;
        peoplesDays[initials] = peoplesDays[initials] + days;
      }
    });
  });
  // for testing ------------ could be used on other page

  function createGroupedTasks(titles, data) {
    const groupedTask = [];
    titles.forEach((title) => {
      const group = data.filter(
        (workPack) => workPack.workPackageTitle === title
      );
      groupedTask.push(group);
    });
    return groupedTask;
  }

  const taskPackTitles = [
    ...new Set(
      allTasks
        .map((workPackage) => workPackage.workPackageTitle)
        // .sort((a, b) => a - b)
    ),
  ];
  const groupedTasks = createGroupedTasks(taskPackTitles, allTasks);
  const deliverables = useSelector((state) =>
    state.deadlines.data.filter((task) => task.type === "deliverable")
  );
  const milestones = useSelector((state) =>
    state.deadlines.data.filter((task) => task.type === "milestone")
  );

  const projectLength = useSelector(
    (state) => state.project.data.projectLength
  );

  const daysPerMonth = [];
  let totalDays = 0;
  for (let i = 0; i < projectLength; i++) {
    let days = 0;
    for (let j = 0; j < allTasks.length; j++) {
      const currentDay = allTasks[j].schedule[i].value;
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
    taskPackTitles,
    groupedTasks,
    deliverables,
    milestones,
    daysPerMonth,
    totalDays,
  };

  return (
    <PageContainer chartWidth={chartWidth}>
      <div id="chartArea" className="chartArea">
        <GanttChartLeft data={data} />
        <GanttChartRight data={data} />
      </div>
      <div className="testPeople">
        {people.map((person, index) => {
          return (
            <div key={index} className="person">
              <span>{person.acronym}:</span>
              <span>{peoplesDays[person.acronym].toFixed(2)}</span>
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
  top: ${appTop};
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: ${appWidth};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  .chartArea {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    max-width: ${(props) => props.chartWidth + 10}px;
    width: 100%;
  }
  .monthHeaderSpacer {
    height: calc(35px + ${wpMarginBottom});
    @media screen and (max-width: 750px) {
      height: 35px;
      border-bottom: 0;
    }
  }

  // remove this
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
  // remove this
`;
