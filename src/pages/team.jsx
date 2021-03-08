import React from "react";
import styled from "styled-components";

import { appTop, appWidth } from "../helpers";
import TeamInfo from "./teamInfo";
import TeamOptions from "./teamOptions";

function Team() {
  return (
    <PageContainer>
      <div className="displayArea">
        <TeamOptions />
        <TeamInfo />
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
