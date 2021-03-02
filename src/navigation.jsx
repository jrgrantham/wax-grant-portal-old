import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {appWidth} from './helpers'

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
  
  .appWidth {
    width: 100%;
    max-width: ${props => props.appWidth};
    align-items: center;
    background-color: #404040;
  }

  ul {
    padding: 0 10px;
    /* background-color: red; */
    display: flex;
    width: 95%;
  }

  li {
    color: white;
    font-weight: 700;
    padding: 3px 10px;
  }
`;
