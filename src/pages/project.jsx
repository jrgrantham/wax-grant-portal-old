import React from "react";
import styled from "styled-components";

import { appTop, appWidth } from "../helpers";

function Project() {
  return (
    <PageContainer>
      <h2>Project</h2>
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
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
`;
