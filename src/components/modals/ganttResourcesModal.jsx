import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import close from "../../images/close-grey.png";

import ResourcesRow from "./ganttResourcesModalRow";

import { getResources, toastDelay, wpTitleColor} from '../../helpers'

toast.configure();

function ResourcesModal(props) {
  const allPeople = useSelector((state) => state.team.data);
  const { packData } = props;
  const taskIds = [...new Set(packData.map((task) => task.taskId))];
  const resources = getResources()

  function closeModal() {
    let close = true;
    for (let i = 0; i < taskIds.length; i++) {
      if (resources[taskIds[i]].completion !== 100) {
        // window.removeEventListener("keydown", checkKey);
        close = false;
        toast.info("All tasks must be 100%", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: toastDelay,
        });
        break;
      }
    }
    if (close) props.setResourcesModal(false);
  }

  function checkBackground(e) {
    if (e.target.id === "background") closeModal();
  }
  // function checkKey(event) {
  //   if (event.key === "Escape" || event.keycode === 27) closeModal();
  // }

  // useEffect(() => {
  //   window.addEventListener("keydown", checkKey, false);
  //   return window.removeEventListener("keydown", checkKey);
  // }, []);

  return (
    <Container id="background" onClick={(e) => checkBackground(e)}>
      {/* <Container id="background" onClick={(e) => checkBackground(e)}> */}
      <div className="editWindow">
        <div className="modalRow title">
          <h3 className="description">Description</h3>
          {allPeople.map((person, index) => {
            return (
              <h3 key={index} className="person">
                {person.acronym}
              </h3>
            );
          })}
          <h3 className="total">Total</h3>
        </div>

        {packData.map((task, index) => {
          return (
            <ResourcesRow
              task={task}
              // index={index}
              key={index}
              allPeople={allPeople}
            />
          );
        })}

        <div className="bottomRow">
          <button onClick={closeModal}>
            <img src={close} alt="close"/>
          </button>
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
    /* padding: 40px 45px 30px 45px; */
    max-height: 80vh;
    overflow: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
  }
  .bottomRow {
    margin: 10px 20px 15px 0px;
    display: flex;
    justify-content: flex-end;
  }
  .modalRow {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .description {
      min-width: 200px;
      max-width: 300px;
    }
  }
  .title {
    height: 50px;
    margin-bottom: 10px;
    background-color: ${wpTitleColor};
    color: white;
    padding: 0 20px;
  }
  .person {
    width: 35px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
  .person.select {
    border: 1px solid lightgray;
    cursor: pointer;
  }
  .total {
    width: 50px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-weight: 600;
  }
  .under {
    color: orange;
  }
  .ok {
    color: green;
  }
  .over {
    color: red;
  }
  img {
    max-width: 25px;
    max-height: 25px;
  }
`;
