import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

function ResourcesModal(props) {
  const dispatch = useDispatch();

  function closeModal(e) {
    if (e.target.id === "background") props.setResourcesModal(false);
  }

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape" || event.keycode === 27)
      props.setResourcesModal(false);
  });

  return (
    <Container id="background" onClick={(e) => closeModal(e)}>
      <div className="editWindow">
        <div className="topRow">
          <button onClick={() => props.setResourcesModal(false)}>Close</button>
        </div>
      </div>
    </Container>
  );
}

export default ResourcesModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.6);
  z-index: 2;

  .editWindow {
    width: 500px;
    height: 390px;
    padding: 15px 15px 30px 15px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
  }

  .topRow {
    display: flex;
    justify-content: space-between;
  }
`;
