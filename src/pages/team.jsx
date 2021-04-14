import React, { useState } from "react";
import styled from "styled-components";

import { appTop, appWidth, tableHeadingHeight, teamGreen, teamGreenFont } from "../helpers";
import TeamHeader from "../components/team/teamHeader";

function Team() {
  const [employmentType, setEmploymentType] = useState("staff");
  
  return (
    <PageContainer>
      <div className="displayArea">
        <div className="employment">
          <div className="headings"></div>
          <button
            id="staff"
            className={employmentType === "staff" ? "selected" : null}
            onClick={() => setEmploymentType("staff")}
          >
            <h3>Staff</h3>
          </button>
          <button id="contract" 
            className={employmentType === "contract" ? "selected" : null}
          
          onClick={() => setEmploymentType("contract")}>
            <h3>Subcontract</h3>
          </button>
        </div>
        <TeamHeader employmentType={employmentType} />
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
  width: 100%;
  max-width: ${appWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  .employment {
    width: 15%;
    display: flex;
    flex-direction: column;
    background-color: ${teamGreen};

    .headings {
      /* height: ${tableHeadingHeight}; */
    }
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
      background-color: rgba(255, 255, 255, 0.5);
      color: ${teamGreenFont}
    }
  }
  .displayArea {
    margin-bottom: 50px;
    display: flex;
    max-width: 1000px;
    width: 100%;
    min-height: 400px;
    overflow: hidden;
    border-radius: 5px;
  }
  .headings {
    height: 50px;
  }
`;
