import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { appWidth } from "./helpers";

function Navigation() {
  const [menu, setMenu] = useState(false);
  return (
    <Container appWidth={appWidth} menu={menu}>
      <div className="menu">
        <div>
          <p className="link">Export</p>
          <p className="link">Logout</p>
        </div>
        <div>
          <p onClick={() => setMenu(false)} className="link">
            Close
          </p>
        </div>
      </div>
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
        <p className="navButton" onClick={() => setMenu(true)}>
          Menu
        </p>
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
  p {
    margin: 5px;
    padding: 5px 10px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: border-color 0.3s;
    &:hover {
      border-color: rgba(255, 255, 255, 0.7);
    }
  }
  .selected {
    color: rgba(0, 0, 0, 0.8);
    background-color: rgba(255, 255, 255, 0.5);
  }

  .menu {
    position: fixed;
    right: ${(props) => (props.menu ? "0" : "-200px")};
    transition: right 0.3s;
    width: 200px;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: #404040;
    .link {
      margin: 10px;
      margin-top: 30px;
      padding: 5px 10px;
      border: 1px solid #404040;
      border-radius: 10px;
      &:hover {
        border: 1px solid white;
      }
    }
  }
`;
