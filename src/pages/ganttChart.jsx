import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GanttWorkPackageDetails from "../components/ganttWorkPackageDetails";
import GanttWorkPackageSchedule from "../components/ganttWorkPackageSchedule";

// needs adding to state
import {deliverables} from '../data/index'

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
  // console.log(deliverables);

  return (
    <Container>
      <h1>Gantt Chart</h1>
      <div className="chartArea">
        <div className="left">
          {group.map((item, index) => {
            return <GanttWorkPackageDetails key={index} workPackData={item} backgroundColor={'blue'}/>;
          })}
          <div className="space">add WP</div>
          <GanttWorkPackageDetails workPackData={deliverables.data} backgroundColor={'red'} />
          <GanttWorkPackageDetails workPackData={deliverables.data} backgroundColor={'red'} />
        </div>
        <div className="right">
          {group.map((item, index) => {
            return <GanttWorkPackageSchedule key={index} workPackData={item} backgroundColor={'blue'} />;
          })}
          <div className="space"></div>
          <GanttWorkPackageSchedule workPackData={deliverables.data} backgroundColor={'red'} />
          <GanttWorkPackageSchedule workPackData={deliverables.data} backgroundColor={'red'} />
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
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  background-color: #e8e8e8;
  padding: 10px;

  .chartArea {
    display: flex;
    width: 100%;
  }
  .left {
  }
  .right {
    overflow-x: scroll;
  }
  .space {
    height: 25px
  }
`;
