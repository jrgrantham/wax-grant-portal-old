import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import GanttPackWork from "./ganttPackWork";
import GanttPackDelsMils from "./ganttPackDelsMils";
import { wPRowAdded } from "../../store/projectData/workPackages";
import { wpTitleColor, delTitleColor, milTitleColor, dividerHeight } from "../../helpers";

function GanttChartLeft(props) {
  const {
    workPackageTitles,
    workPackages,
    deliverables,
    milestones,
    totalDays,
  } = props.data;

  const projectLength = useSelector(
    (state) => state.project.data.projectLength
  );
  const dispatch = useDispatch();
  function createNewWorkPackage() {
    dispatch(wPRowAdded({ projectLength }));
  }

  return (
    <PageContainer>
      <div id="details">
        <div className="monthHeaderSpacer"></div>
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
            <h3>{totalDays ? totalDays : null}</h3>
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

      /* border: 1px solid white; */
      color: rgba(255, 255, 255, 0.6);
    }
    button {
      height: 30px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`;
