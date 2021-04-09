import React, { useState } from "react";
import styled from "styled-components";

import { appTop, appWidth, tableHeadingHeight } from "../helpers";
import TeamInfo from "./teamInfo";

function Team() {
  const [employmentType, setEmploymentType] = useState("staff");
  console.log(employmentType);

  return (
    <PageContainer>
      <div className="displayArea">
        <div className="employment">
          <div className="headings"></div>
          <button id="staff" onClick={() => setEmploymentType("staff")}>
            <h3>Staff</h3>
          </button>
          <button id="staff" onClick={() => setEmploymentType("contract")}>
            <h3>Sub Contract</h3>
          </button>
        </div>
        <TeamInfo employmentType={employmentType} />
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
    background-color: green;

    .headings {
      height: ${tableHeadingHeight};
    }
    button {
      border: none;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      padding: 10px;
      color: white;
      margin-bottom: 10px;
      border-radius: 0;
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
