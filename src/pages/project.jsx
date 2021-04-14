import React, { useState } from "react";
import styled from "styled-components";

import { appTop, appWidth } from "../helpers";
import ProjectInfo from "../components/project/projectHeader";

function Project() {
  const [employmentType, setEmploymentType] = useState("staff");
  console.log(employmentType);

  return (
    <PageContainer>
      <div className="displayArea">
        <div className="employment">
          <div className="headings"></div>
          <button
            id="company"
            className={employmentType === "company" ? "selected" : null}
            onClick={() => setEmploymentType("company")}
          >
            <h3>Company</h3>
          </button>
          <button
            id="project"
            className={employmentType === "project" ? "selected" : null}
            onClick={() => setEmploymentType("project")}
          >
            <h3>Project</h3>
          </button>
          <button
            id="options"
            className={employmentType === "options" ? "selected" : null}
            onClick={() => setEmploymentType("options")}
          >
            <h3>Options</h3>
          </button>
        </div>
        <ProjectInfo employmentType={employmentType} />
      </div>
    </PageContainer>
  );
}
export default Project;

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
    background-color: blue;
    button {
      border: none;
      background-color: rgba(255, 255, 255, 0.08);
      display: flex;
      padding: 15px 10px;
      color: white;
      margin-bottom: 10px;
      border-radius: 0;
    }
    button.selected {
      background-color: rgba(255, 255, 255, 0.25);
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
