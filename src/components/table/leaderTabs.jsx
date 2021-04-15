import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateUserOption } from "../../store/projectData/user";
import {
  tabHeight,
  tabUnselected,
  tableContentTopMargin,
  tabBorderLeft,
  tabBorderRight,
} from "../../helpers";

function LeaderTabs(props) {
  const dispatch = useDispatch();
  const leader = useSelector((state) => state.user.selectedLeader);

  const pOne = "Partner One";
  const pTwo = "Partner One";

  const tabs = [
    { name: "Lead Applicant", key: "lead" },
    { name: pOne, key: "pOne" },
    { name: pTwo, key: "pTwo" },
    { name: "Combined", key: "combined" },
  ];

  if (!props.viewCombinedTab) {
    if (leader === "combined") selectLeader("lead");
    tabs.pop();
  }

  function selectLeader(value) {
    dispatch(updateUserOption({ key: "selectedLeader", value }));
  }

  return (
    <PageContainer>
      {tabs.map((tab, index) => {
        return (
          <h3
            key={index}
            className={leader === tab.key ? "leader selectedLeader" : "leader"}
            style={index === 0 ? { borderRadius: "0px 6px 0 0" } : null}
            onClick={() => selectLeader(tab.key)}
          >
            {tab.name}
          </h3>
        );
      })}
    </PageContainer>
  );
}
export default LeaderTabs;

const PageContainer = styled.div`
  height: ${tabHeight};
  display: flex;

  .leader {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${tabUnselected};
    color: white;
    border-left: 2px solid ${tabBorderLeft};
    border-right: 2px solid ${tabBorderRight};
    cursor: pointer;
  }
  .selectedLeader {
    background-color: white;
    color: black;
    border-radius: 6px 6px 0 0;
    border-left: 2px solid white;
    border-right: 2px solid white;
    /* border: none */
  }
`;
