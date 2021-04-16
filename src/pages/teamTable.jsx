import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { teamColor, teamFontColor } from "../helpers";
import TeamData from "../components/team/teamData";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import TeamTitles from "../components/team/teamTitles";
import { TableContainer } from "../components/table/tableStyling";

function Team() {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.user.selectedTeamOption);
  const menuList = ["Staff", "Subcontract"];

  const menuData = {
    menuList,
    selectedOption,
    color: teamFontColor,
    backgroundColor: teamColor,
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedTeamOption", value }));
    },
  };

  return (
    <TableContainer underline={menuData.backgroundColor}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <LeaderTabs viewCombinedTab={false} />
          <TeamTitles />
          <TeamData />
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
