import React from "react";
import styled from "styled-components";
import { tableHeadingHeight } from "../helpers";

function TeamOptions(props) {
  return (
    <PageContainer>
      <div className="headings"></div>
      {/* <button id="staff" onClick={props.setSelectedEmployment("staff")}> */}
      <button id="staff" >
        <h3>Staff</h3>
      </button>
      {/* <button id="subContract" onClick={props.setSelectedEmployment("contract")}> */}
      <button id="subContract">
        <h3>Sub Contract</h3>
      </button>
    </PageContainer>
  );
}
export default TeamOptions;

const PageContainer = styled.div`
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
`;
