import React from "react";
import styled from "styled-components";
import {
  tabHeight,
  tableLeftWidth,
} from "../../helpers";
import Button from "./leftMenuButton";

function LeftMenu(props) {
  const { menuList, backgroundColor } = props.data;

  return (
    <MenuContainer backgroundColor={backgroundColor}>
      <div className="spacer"></div>
      {menuList.map((option, index) => {
        return <Button option={option} key={index} data={props.data} />;
      })}
      <div className="spacer"></div>
    </MenuContainer>
  );
}
export default LeftMenu;

const MenuContainer = styled.div`
  width: ${tableLeftWidth};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  button {
    border: none;
    background-color: transparent;
    display: flex;
    padding: 15px 10px;
    color: white;
    margin-bottom: 10px;
    border-radius: 0;
  }
  .spacer {
    height: ${tabHeight};
  }
`;
