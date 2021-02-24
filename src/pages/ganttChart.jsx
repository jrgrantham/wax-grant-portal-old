import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GanttScheduleBackground from "../components/gantt/ganttScheduleBackground";

import GanttWorkPackageDetails from "../components/gantt/ganttWorkPackageDetails";
import GanttWorkPackageSchedule from "../components/gantt/ganttWorkPackageSchedule";

function GanttChart() {
  const bundledWPData = useSelector((state) => state.workPackages.data);
  // function compareTypes(a, b) {
  //   if (a.type < b.type) return -1;
  //   if (a.type > b.type) return 1;
  //   return 0;
  // }
  // const delsAndMils = useSelector((state) => state.delsAndMils.data.sort(compareTypes))
  const deliverables = useSelector((state) =>
    state.delsAndMils.data.filter((row) => row.type === "deliverable")
  );
  const milestones = useSelector((state) =>
    state.delsAndMils.data.filter((row) => row.type === "milestone")
  );

  const workPackageTitles = [
    ...new Set(
      bundledWPData.map((workPackage) => workPackage.workPackageTitle)
    ),
  ];

  workPackageTitles.sort((a, b) => a - b);

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

  const groupedWPData = createSubArraysByTitle(
    workPackageTitles,
    bundledWPData
  );

  // if (groupedWPData.length) {
  //   console.log("true");
  // }

  const populatedWPDetails = groupedWPData.map((item, index) => {
    return (
      <GanttWorkPackageDetails
        key={index}
        workPackData={item}
        backgroundColor={"blue"}
        title={workPackageTitles[index]}
      />
    );
  });
  const populatedWPSchedule = groupedWPData.map((item, index) => {
    return (
      <GanttWorkPackageSchedule
        key={index}
        workPackData={item}
        backgroundColor={"blue"}
      />
    );
  });
  const emptyWPDetails = (
    <div className="empty">
      <button>add a workpack</button>
    </div>
  );
  const emptyWPSchedule = <div className="empty"></div>;

  const wpDetailsOutput = groupedWPData.length
    ? populatedWPDetails
    : emptyWPDetails;
  const wpScheduleOutput = groupedWPData.length
    ? populatedWPSchedule
    : emptyWPSchedule;

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
  }, []);

  return (
    <Container>
      <h4>Gantt Chart</h4>
      <div className="chartArea">
        <div className="left">
          <div className="months"></div>
          {wpDetailsOutput}
          <GanttWorkPackageDetails
            workPackData={deliverables}
            backgroundColor={"red"}
            title={"Deliverables"}
          />
          <GanttWorkPackageDetails
            workPackData={milestones}
            backgroundColor={"green"}
            title={"Milestones"}
          />
        </div>

        <div className="right">
          <div className="inner">
            <GanttScheduleBackground />
            <div className="months"></div>
            {wpScheduleOutput}
            <GanttWorkPackageSchedule
              workPackData={deliverables}
              prefix={"D"}
              backgroundColor={"red"}
            />
            <GanttWorkPackageSchedule
              workPackData={milestones}
              prefix={"M"}
              backgroundColor={"green"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GanttChart;

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
    height: 45px;
    border-bottom: 10px solid rgba(250, 250, 250, 0.25);
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
  .empty {
    height: 70px;
    button {
      width: 400px;
    }
  }
`;
