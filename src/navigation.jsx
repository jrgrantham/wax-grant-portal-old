import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { appWidth, navBackground } from "./helpers";
import navHome from './images/navHome.png';
import navBurger from './images/navBurger.png';

function Navigation() {
  function openMenu() {
    setMenu(true);
    // console.log("open");
  }
  const [menu, setMenu] = useState(false);
  return (
    <Container appWidth={appWidth} menu={menu}>
      <div className="navBar">
        <NavLink
          exact
          to="/"
          className="navButton small"
          activeClassName="selected"
        >
          Home
        </NavLink>

        <div className="links">
          <NavLink exact to="/project" activeClassName="selected">
            <div className="navButton">Project</div>
          </NavLink>
          <NavLink exact to="/team" activeClassName="selected">
            <div className="navButton">Team</div>
          </NavLink>
          <NavLink to="/gantt" activeClassName="selected">
            <div className="navButton">Gantt Chart</div>
          </NavLink>
          <NavLink exact to="/costs" activeClassName="selected">
            <div className="navButton">Costs</div>
          </NavLink>
          <NavLink exact to="/revenue" activeClassName="selected">
            <div className="navButton">Revenue</div>
          </NavLink>
        </div>

        <p className="navButton small" onClick={openMenu}>
          Menu
        </p>
      </div>

      <div onClick={() => setMenu(false)} id="menu" className="menu">
        <div className="top">
          <button onClick={() => console.log("Export")} className="menuButton">
            Export
          </button>
          <button onClick={() => console.log("Logout")} className="menuButton">
            Logout
          </button>
        </div>
        <button className="menuButton">
          <a href="http://intangible-engineering.com">Developer</a>
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
  background-color: ${navBackground};
  z-index: 10;

  .navBar {
    width: 100%;
    max-width: ${(props) => props.appWidth};
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .links {
    display: flex;
  }
  a,
  p {
    /* width: 170px; */
    display: flex;
    justify-content: center;
    /* width: 170px; */
    margin: 10px 5px;
    padding: 5px 20px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 5px;
  }
  .navButton {
    border-radius: 5px;
    padding: 5px;
    background-image: linear-gradient(${navBackground}, ${navBackground}),
      linear-gradient(white, white);
    background-size: 100% 2px, 100% 2px;
    background-position: 100% 100%, 0 100%;
    background-repeat: no-repeat, no-repeat;
    transition: background-size 0.3s linear;
    &:hover {
      background-size: 0 2px, 100% 2px;
    }
  }
  .navButton.small {
    width: 80px;
  }
  .selected {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .selected .navButton:hover {
    background-size: 100% 2px, 100% 2px;
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
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    background-color: rgba(50, 50, 50, 1);
    cursor: pointer;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    a {
      font-size: 14px;
      margin: 0;
      padding: 0;
      color: #a1a1a1
    }
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
