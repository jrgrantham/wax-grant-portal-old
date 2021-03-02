import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

function ResourcesModal(props) {
  const dispatch = useDispatch();
  const allPeople = useSelector((state) => state.project.data.resources);
  const allTasks = useSelector((state) => state.workPackages.data);

  function onChangeHandler(e, rowId) {
    console.log(e.target.name, e.target.value, rowId);
  }
  const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  function closeModal(e) {
    if (e.target.id === "background") props.setResourcesModal(false);
  }
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.keycode === 27)
      props.setResourcesModal(false);
  });

  return (
    <Container id="background" onClick={(e) => closeModal(e)}>
      <div className="editWindow">
        <div className="topRow">
          <button onClick={() => props.setResourcesModal(false)}>Close</button>
        </div>
        <div className="modalRow">
          <h3 className="description">Description</h3>
          {allPeople.map((person, index) => {
            return (
              <h3 key={index} className="person">
                {person}
              </h3>
            );
          })}
          <h3 className='total'>Total</h3>
        </div>
        {allTasks.map((row, index) => {
          return (
            <div key={index} className="modalRow">
              <p className="description">{row.description}</p>
              {allPeople.map((person, index) => {
                return (
                  <select
                    className="person"
                    key={index}
                    value={row.resources[person]+"%"}
                    onChange={(e) => onChangeHandler(e, row.rowId)}
                    id='resources'
                    name='resources'
                  >
                    {percentages.map((option, index) => {
                      return <option key={index}>{option}%</option>;
                    })}
                  </select>
                );
              })}
            </div>
          );
        })}
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
    /* width: 500px; */
    /* height: 390px; */
    padding: 30px 45px;

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
  .modalRow {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .description {
      min-width: 200px;
      max-width: 300px;
    }
    .person {
      width: 50px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      border: 1px solid lightgray;
    }
  }
`;
