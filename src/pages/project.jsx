import React, { useState } from "react";
import styled from "styled-components";

import {
  appTop,
  appWidth,
  tabHeight,
  tableLeftHighlight,
  tableLeftWidth,
  tableHeadingHeight,
  tableMinHeight,
  teamColor,
  teamFontColor,
} from "../helpers";
import ProjectInfo from "../components/project/projectInfo";

function Team() {
  const [employmentType, setEmploymentType] = useState("staff");

  return (
    <PageContainer>
      <div className="displayArea">
        <div className="left">
          <div className="spacer"></div>
          <button
            id="staff"
            className={employmentType === "staff" ? "selected" : null}
            onClick={() => setEmploymentType("staff")}
          >
            <h3>Staff</h3>
          </button>
          <button
            id="contract"
            className={employmentType === "contract" ? "selected" : null}
            onClick={() => setEmploymentType("contract")}
          >
            <h3>Subcontract</h3>
          </button>
        </div>
        <ProjectInfo employmentType={employmentType} />
      </div>
    </PageContainer>
  );
}
export default Team;

const PageContainer = styled.div`
  position: relative;
  top: ${appTop};
  margin: auto;
  padding: 10px;
  /* width: 100%; */
  max-width: ${appWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  .left {
    width: ${tableLeftWidth};
    display: flex;
    flex-direction: column;
    background-color: ${teamColor};
    button {
      border: none;
      background-color: transparent;
      display: flex;
      padding: 15px 10px;
      color: white;
      margin-bottom: 10px;
      border-radius: 0;
    }
    button.selected {
      background-color: ${tableLeftHighlight};
      color: ${teamFontColor};
    }
  }
  .displayArea {
    margin-bottom: 50px;
    display: flex;
    min-height: ${tableMinHeight};
    overflow: hidden;
    border-radius: 6px;
    /* border: 1px solid red */
  }
  .spacer {
    height: ${tabHeight};
  }
`;
