import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { appWidth } from "./helpers";

function Navigation() {
  function openMenu() {
    setMenu(true);
    console.log("open");
  }
  const [menu, setMenu] = useState(false);
  return (
    <Container appWidth={appWidth} menu={menu}>
      <div className="navBar">
        <ul>
          <li>
            <NavLink
              exact
              to="/project"
              className="navButton hover hover-3"
              activeClassName="selected"
            >
              Project
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/team"
              className="navButton hover hover-3"
              activeClassName="selected"
            >
              Team
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gantt"
              className="navButton hover hover-3"
              activeClassName="selected"
            >
              Gantt Chart
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/costs"
              className="navButton hover hover-3"
              activeClassName="selected"
            >
              Costs
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/revenue"
              className="navButton hover hover-3"
              activeClassName="selected"
            >
              Revenue
            </NavLink>
          </li>
        </ul>
        <p className="navButton hover hover-3" onClick={openMenu}>
          Menu
        </p>
      </div>

      <div onClick={() => setMenu(false)} id="menu" className="menu">
        <button onClick={() => console.log("Export")} className="menuButton">
          Export
        </button>
        <button onClick={() => console.log("Logout")} className="menuButton">
          Logout
        </button>
      </div>
    </Container>
  );
}
export default Navigation;

const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
  position: fixed;
  top: 0;
  z-index: 10;

  .navBar {
    width: 100%;
    max-width: ${(props) => props.appWidth};
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(12, 58, 93, 1);
  }
  ul {
    display: flex;
  }

  .navButton {
    margin: 5px;
    padding: 15px 30px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.15);
    cursor: pointer;

    background-image: linear-gradient(rgba(12, 58, 93, 1), rgba(12, 58, 93, 1)),
      linear-gradient(white, white);
    background-size: 100% 2px, 100% 2px;
    background-position: 100% 100%, 0 100%;
    background-repeat: no-repeat, no-repeat;
    transition: background-size 0.3s linear;

    &:hover {
      background-size: 0 2px, 100% 2px;
    }
  }
  .selected {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
  }
  .menu {
    position: fixed;
    right: ${(props) => (props.menu ? "0" : "-200px")};
    transition: right 0.3s;
    width: 200px;
    height: 100%;

    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(50, 50, 50, 0.98);
    cursor: pointer;
  }
  .menuButton {
    margin-top: 20px;
    width: 150px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid #404040;
  }
`;
