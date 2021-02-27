import React, { useEffect, useState } from "react";
//  function
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import GanttScheduleBackground from "../components/gantt/ganttScheduleBackground";
import GanttWorkPackageDetails from "../components/gantt/ganttWorkPackageDetails";
import GanttWorkPackageSchedule from "../components/gantt/ganttWorkPackageSchedule";
import { wPRowAdded } from "../store/projectData/workPackages";
import { appWidth, wpTitleColor, delTitleColor, milTitleColor } from "../helpers";

function Trial() {
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

  const [chartWidth, setChartWidth] = useState(0);
  useEffect(() => {
    // const slider = document.querySelector(".right");
    // let isDown = false;
    // let startX;
    // let scrollLeft;
    // slider.addEventListener("mousedown", (e) => {
    //   if (e.target.className.includes('backgroundColumn')) {
    //     isDown = true;
    //     startX = e.pageX - slider.offsetLeft;
    //     scrollLeft = slider.scrollLeft;
    //   };
    //   // slider.classList.add("active");
    // });
    // slider.addEventListener("mouseleave", () => {
    //   isDown = false;
    //   // slider.classList.remove("active");
    // });
    // slider.addEventListener("mouseup", () => {
    //   isDown = false;
    //   // slider.classList.remove("active");
    // });
    // slider.addEventListener("mousemove", (e) => {
    //   if (!isDown) return;
    //   e.preventDefault();
    //   const x = e.pageX - slider.offsetLeft;
    //   // const walk = (x - startX) * 3; //scroll-fast
    //   const walk = (x - startX)
    //   slider.scrollLeft = scrollLeft - walk;
    //   // console.log(walk);
    // });

    const scheduleElement = document.getElementById("schedule").scrollWidth;
    const detailsElement = document.getElementById("details").scrollWidth;
    setChartWidth(Math.max(500, scheduleElement + detailsElement + 2));
  }, []);

  // JSX

  const populatedWPDetails = workPackages.map((item, index) => {
    return (
      <GanttWorkPackageDetails
        key={index}
        workPackData={item}
        titleBarColor={wpTitleColor}
        title={workPackageTitles[index]}
      />
    );
  });
  const populatedWPSchedule = workPackages.map((item, index) => {
    return (
      <GanttWorkPackageSchedule
        key={index}
        workPackData={item}
        // backgroundColor={"blue"}
      />
    );
  });
  const emptyWPDetails = (
    <div className="empty">
      <button>add a workpack</button>
    </div>
  );
  const emptyWPSchedule = <div className="empty"></div>;

  const wpDetailsOutput = workPackages.length
    ? populatedWPDetails
    : emptyWPDetails;
  const wpScheduleOutput = workPackages.length
    ? populatedWPSchedule
    : emptyWPSchedule;

  return (
    <Container chartWidth={chartWidth} appWidth={appWidth} >
      <h2>Gantt Chart</h2>
      <div id="chartArea" className="chartArea">
        <div id="details" className="left">
          <div className="months"></div>
          {wpDetailsOutput}
          <div className="space">
            <button onClick={createNewWorkPackage}>Add new Work Package</button>
          </div>
          <GanttWorkPackageDetails
            workPackData={deliverables}
            titleBarColor={delTitleColor}
            title={"Deliverables"}
          />
          <GanttWorkPackageDetails
            workPackData={milestones}
            titleBarColor={milTitleColor}
            title={"Milestones"}
          />
        </div>

        <div id="schedule" className="right">
          <div className="inner">
            <GanttScheduleBackground />
            <div className="months"></div>
            {wpScheduleOutput}
            <div className="space" />

            <GanttWorkPackageSchedule
              workPackData={deliverables}
              prefix={"D"}
              titleBarColor={"red"}
            />
            <GanttWorkPackageSchedule
              workPackData={milestones}
              prefix={"M"}
              titleBarColor={"green"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Trial;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  max-width: ${props => props.appWidth};
  @media screen and (max-width: 750px) {
    padding: 0px;
    width: 100%;
    border-radius: 0;
  }
  h2 {
    color: white;
    margin: 10px 0 17px 0;
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
    height: 45px;
    border-bottom: 10px solid rgba(250, 250, 250, 0.25);
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
    overflow-x: scroll;
    width: 100%;
    border-left: 1px solid rgba(250, 250, 250, 0.5);
    border-right: 1px solid rgba(250, 250, 250, 0.5);
    border-radius: 4px;
    @media screen and (max-width: 550px) {
      display: none;
    }
    .inner {
      scrollbar-color: red yellow;
      position: relative;
    }
  }
  .space {
    height: 50px;
    padding-top: 5px;
    button {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .empty {
    height: 70px;
    button {
      width: 400px;
    }
  }
`;
