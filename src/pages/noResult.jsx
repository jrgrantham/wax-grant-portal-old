import React from "react";
import styled from "styled-components";

function NoResult() {

  return (
    <Container>
      <h1>404</h1>
      <h4>Page not found</h4>
    </Container>
  );
}

export default NoResult;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  color: white;
`;
