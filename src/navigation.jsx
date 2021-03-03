import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { appWidth } from "./helpers";

function Navigation() {
  return (
    <Container appWidth={appWidth}>
      <div className="appWidth">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/gantt">Gantt</NavLink>
          </li>
        </ul>
        <p>Menu</p>
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
  z-index: 100;

  .appWidth {
    width: 100%;
    max-width: ${(props) => props.appWidth};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #404040;
  }

  ul {
    padding: 0 10px;
    /* background-color: red; */
    display: flex;
    width: 95%;
  }

  li,p {
    color: white;
    font-size: 16px;
    font-weight: 700;
    padding: 3px 10px;
  }
`;
