import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  return (
    <Container>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/gantt">gantt</NavLink>
        </li>
      </ul>
    </Container>
  );
}
export default Navigation;

const Container = styled.nav`
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: fixed;
  top: 0;

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
