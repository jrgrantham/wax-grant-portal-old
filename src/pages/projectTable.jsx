import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { projectColor, projectFontColor } from "../helpers";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import ProjectRows from "../components/project/projectRows";

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

  function content() {
    if (selectedOption === "company") return <ProjectRows />;
    if (selectedOption === "project") return <ProjectRows />;
    if (selectedOption === "options") return <ProjectRows />;
  }

  return (
    <TableContainer underline={menuData.backgroundColor}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <LeaderTabs viewCombinedTab={false} />
          {content()}
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
