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
              to="/"
              className="navButton"
              activeClassName="selected"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gantt"
              className="navButton"
              activeClassName="selected"
            >
              Gantt
            </NavLink>
          </li>
        </ul>
        <p className="navButton" onClick={openMenu}>
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
    background-color: rgba(0, 0, 0, 0.5);
  }
  ul {
    display: flex;
  }

  .navButton,
  a,
  p,
  button {
    margin: 5px;
    padding: 5px 10px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      border-color: rgba(255, 255, 255, 1);
    }
  }
  .selected {
    /* color: rgba(0, 0, 0, 0.8); */
    background-color: rgba(255, 255, 255, 0.2);
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
    background-color: rgba(25, 25, 25, 1);
    border: 1px solid #404040;
    &:hover {
      border: 1px solid white;
    }
  }
`;
