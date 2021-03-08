import React from "react";
import styled from "styled-components";

function HomePage() {

  return (
    <Container>
      <h2>Grant Portal</h2>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  color: white;
  h2 {
    font-size: 120px;
  }
`;
