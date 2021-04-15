import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { projectColor, projectFontColor } from "../helpers";
import TeamData from "../components/table/teamData";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import TeamTitles from "../components/table/teamTitles";
import { TableContainer } from "../components/table/tableContainer";

function Team() {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) => state.user.selectedProjectOption
  );
  const menuList = ["Company", "Project", "Options"];
  const menuData = {
    menuList,
    selectedOption,
    color: projectFontColor,
    backgroundColor: projectColor,
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedProjectOption", value }));
    },
  };

  return (
    <TableContainer>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <LeaderTabs viewCombinedTab={false} />
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
