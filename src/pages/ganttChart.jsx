import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import GanttScheduleBackground from "../components/ganttScheduleBackground";

import GanttWorkPackageDetails from "../components/ganttWorkPackageDetails";
import GanttWorkPackageSchedule from "../components/ganttWorkPackageSchedule";

// needs adding to state
import { deliverables } from "../data/index";
import { milestones } from "../data/index";

function GanttChart(props) {
  const workPackageTitles = [
    ...new Set(
      props.workPackages.data.map((workPackage) => workPackage.workPackageTitle)
    ),
  ];

  function createSubArraysByTitle(titles, data) {
    const groupedWork = [];
    titles.forEach((title) => {
      const group = data.filter(
        (workPack) => workPack.workPackageTitle === title
      );
      groupedWork.push(group);
    });
    return groupedWork;
  }

  const group = createSubArraysByTitle(
    workPackageTitles,
    props.workPackages.data
  );

  return (
    <Container>
      <h4>Gantt Chart</h4>
      <div className="chartArea">
        <div className="left">
          <div className="months"></div>
          {group.map((item, index) => {
            return (
              <GanttWorkPackageDetails
                key={index}
                workPackData={item}
                backgroundColor={"blue"}
                title={workPackageTitles[index]}
              />
            );
          })}
          <div className="space">
            <button>New WP</button>
          </div>
          <GanttWorkPackageDetails
            workPackData={deliverables.data}
            backgroundColor={"red"}
            title={"Deliverables"}
          />
          <GanttWorkPackageDetails
            workPackData={milestones.data}
            backgroundColor={"green"}
            title={"Milestones"}
          />
        </div>
        <div className="right">
          <div className="inner">
            <GanttScheduleBackground />
            <div className="months"></div>
            {group.map((item, index) => {
              return (
                <GanttWorkPackageSchedule
                  key={index}
                  workPackData={item}
                  backgroundColor={"blue"}
                />
              );
            })}
            <div className="space"></div>
            <GanttWorkPackageSchedule
              workPackData={deliverables.data}
              prefix={"D"}
              backgroundColor={"red"}
            />
            <GanttWorkPackageSchedule
              workPackData={milestones.data}
              prefix={"M"}
              backgroundColor={"green"}
            />
          </div>
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

  h4 {
    margin: 10px 0 17px 0;
  }

  .chartArea {
    display: flex;
    /* justify-content: center; */
    width: 100%;
  }
  .months {
    height: 30px;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-x: scroll;
    width: 100%;
    .inner {
      position: relative;
    }
  }
  .space {
    height: 50px;
  }
`;
