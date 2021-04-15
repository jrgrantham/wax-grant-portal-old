import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import GanttPackWork from "./ganttTaskPackInfo";
import GanttPackdeadlines from "./ganttDeadlinePackInfo";
import { addTask } from "../../store/projectData/tasks";
import {
  wpTitleColor,
  delTitleColor,
  milTitleColor,
  dividerHeight,
  totalDaysColor,
} from "../../helpers";
import add from "../../images/add-white.png";

function GanttChartLeft(props) {
  const {
    taskPackTitles,
    groupedTasks,
    deliverables,
    milestones,
    totalDays,
  } = props.data;

  const projectLength = useSelector(
    (state) => state.project.data.projectLength
  );
  const dispatch = useDispatch();
  function createNewWorkPackage() {
    dispatch(
      addTask({
        projectLength,
        title: `Work Package ${taskPackTitles.length + 1}`,
      })
      // addTask({ projectLength })
    );
  }

  return (
    <PageContainer>
      <div id="details">
        <div className="monthHeaderSpacer"></div>
        {groupedTasks.length
          ? groupedTasks.map((task, index) => {
              return (
                <GanttPackWork
                  key={index}
                  index={index}
                  packData={task}
                  titleBarColor={wpTitleColor}
                  title={taskPackTitles[index]}
                  taskPackTitles={taskPackTitles}
                />
              );
            })
          : null}
        <div className="divider">
          <button className="totalDays content" onClick={createNewWorkPackage}>
            <img src={add} alt="add" />
          </button>
          <div className="totalDays content">
            <h3>{totalDays ? totalDays : null}</h3>
          </div>
        </div>
        <GanttPackdeadlines
          workPackData={deliverables}
          titleBarColor={delTitleColor}
          title={"Deliverables"}
        />
        <GanttPackdeadlines
          workPackData={milestones}
          titleBarColor={milTitleColor}
          title={"Milestones"}
        />
      </div>
    </PageContainer>
  );
}
export default GanttChartLeft;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  @media screen and (max-width: 550px) {
    margin-right: 0;
    width: 100%;
  }
  .divider {
    height: ${dividerHeight};
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .totalDays {
      width: 80px;
    }
    .totalDays.content {
      height: 30px;
      padding-right: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: ${totalDaysColor};
    }
    button {
      height: 40px;
      background-color: transparent;
      border: none;
      padding: 0;
      display: flex;
      /* padding-left: 30px;
      padding-right: 30px; */
    }
    img {
      margin: none;
      height: 80%;
      width: auto;
    }
  }
`;
