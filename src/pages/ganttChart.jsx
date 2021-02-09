import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttWorkPackageDetails from "../components/ganttWorkPackageDetails";
import GanttWorkPackageSchedule from "../components/ganttWorkPackageSchedule";

function GanttChart(props) {
  const workPackages = props.workPackages.data;
  const workPackageTitles = [
    ...new Set(workPackages.map((workPackage) => workPackage.workPackageTitle)),
  ];

  function createSubArraysForTitles(uniqueTitlesArray, dataArray) {
    const groupedWork = [];
    uniqueTitlesArray.forEach((title) => {
      const group = dataArray.filter(
        (entry) => entry.workPackageTitle === title
      );
      groupedWork.push(group);
    });
    return groupedWork;
  }

  const group = createSubArraysForTitles(workPackageTitles, workPackages);
  console.log(group);

  return (
    <Container>
      <h1>Gantt Chart</h1>
      <div className="chartArea">
        <div className="left">
          {group.map((item, index) => {
            return <GanttWorkPackageDetails key={index} workPackData={item} />;
          })}
          {/* <GanttWorkPackageDetails workPackData={props.workPackages.data} /> */}
        </div>
        <div className="right">
          {group.map((item, index) => {
            return <GanttWorkPackageSchedule key={index} workPackData={item} />;
          })}
          {/* <GanttWorkPackageSchedule workPackData={props.workPackages.data} /> */}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(GanttChart);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .chartArea {
    display: flex;
    width: 100%;
  }
  .left {
  }
  .right {
    overflow-x: scroll;
  }
`;
