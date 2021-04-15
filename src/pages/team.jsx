import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateUserOption } from "../store/projectData/user";
import {
  appTop,
  appWidth,
  tableMinHeight,
  teamColor,
  teamFontColor,
} from "../helpers";
import TeamInfo from "../components/table/teamInfo";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";

function Team() {
  const dispatch = useDispatch();
  const selectedTeamOption = useSelector(
    (state) => state.user.selectedTeamOption
  );
  const menuList = ["Staff", "Subcontract"];
  const menuData = {
    menuList,
    selectedOption: selectedTeamOption,
    color: teamFontColor,
    backgroundColor: teamColor,
    updateOption: function (value) {
      dispatch(updateUserOption({ key: "selectedTeamOption", value }));
    },
  };

  return (
    <PageContainer>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <LeaderTabs viewCombinedTab={false} />
          <TeamInfo employmentType={selectedTeamOption} />
        </div>
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
    min-height: ${tableMinHeight};
    overflow: hidden;
    border-radius: 6px;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
`;
