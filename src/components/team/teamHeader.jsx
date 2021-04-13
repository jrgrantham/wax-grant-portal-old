import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import TeamInfoRow from "./teamRow";
import { tableHeadingHeight } from "../../helpers";
import { addTeamMember, reorderTeam } from "../../store/projectData/team";
import { useSelector } from "react-redux";
import add from "../../images/add-grey.png";

function TeamHeader(props) {
  const dispatch = useDispatch();
  const employmentType = props.employmentType;
  const team = useSelector((state) => state.team.data);
  console.log(team);

  const [selectedLeader, setSelectedLeader] = useState("lead");
  const employmentGroup = team.filter(
    (person) => person.employment === employmentType
  );
  const group = employmentGroup.filter(
    (person) => person.leader === selectedLeader
  );

  function addPerson() {
    const lastPerson = group.slice(-1)[0];
    const lastPersonIndex = team.indexOf(lastPerson);
    const position = lastPersonIndex + 1;
    const number = team.length + 1;
    const newPerson = {
      personId: uuidv4(),
      name: `Team Member ${number}`,
      role: "tbc",
      salary: 0,
      leader: selectedLeader,
      acronym: `TM${number}`,
      employment: employmentType,
    };
    dispatch(addTeamMember({ newPerson, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const person = team[result.source.index];
    console.log(person, movement);
    dispatch(reorderTeam({ person, movement }));
  }

  return (
    <PageContainer>
      <div className="headings">
        <h3
          id="lead"
          className={
            selectedLeader === "lead" ? "select selectedLeader" : "select"
          }
          onClick={() => setSelectedLeader("lead")}
        >
          Lead Applicant
        </h3>
        <h3
          id="pOne"
          className={
            selectedLeader === "pOne" ? "select selectedLeader" : "select"
          }
          onClick={() => setSelectedLeader("pOne")}
        >
          Partner One
        </h3>
        <h3
          id="pTwo"
          className={
            selectedLeader === "pTwo" ? "select selectedLeader" : "select"
          }
          onClick={() => setSelectedLeader("pTwo")}
        >
          Partner Two
        </h3>
      </div>

      <div className="titles">
        <div className="person">
          <div className="menu" />
          <h3 className="field name">Name</h3>
          <h3 className="field acronym">Acronym</h3>
          <h3 className="field role">Role</h3>
          {employmentType === "staff" ? (
            <h3 className="field salary">Salary</h3>
          ) : (
            <>
              <h3 className="field dayRate">Day rate</h3>
              <h3 className="field location">Location</h3>
            </>
          )}
          <div className="delete"></div>
        </div>
      </div>
      <div className="people">
        <DragDropContext onDragEnd={handleMovingRow}>
          <Droppable droppableId="team">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {group.map((person, index) => {
                  return (
                    <Draggable
                      key={person.personId}
                      draggableId={person.personId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="MonthContainer packBackground"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {/* <GanttTaskRowInfo
                          packData={packData}
                          taskPackTitles={props.taskPackTitles}
                          provided={provided}
                          key={index}
                          task={task}
                          isWP={isWP}
                        /> */}
                          <TeamInfoRow
                            employmentType={employmentType}
                            provided={provided}
                            key={index}
                            person={person}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* {group.map((person, index) => {
          return (
            <TeamInfoRow
              employmentType={employmentType}
              key={index}
              person={person}
            />
          );
        })} */}
      </div>
      <button className="evenWidth" onClick={addPerson}>
        <img src={add} alt="add" />
      </button>
    </PageContainer>
  );
}
export default TeamHeader;

const PageContainer = styled.div`
  width: 85%;
  background-color: white;
  color: black;
  .headings {
    height: ${tableHeadingHeight};
    display: flex;
    background-color: #b1b1b1;
  }
  .select {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .selectedLeader {
    background-color: white;
    border-radius: 5px 5px 0 0;
  }
  .field {
    padding: 5px 10px;
    flex-grow: 1;
  }
  .person {
    display: flex;
    align-items: center;
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
  }
  .menu {
    width: 20px;
    margin-left: 10px;
  }
  .name {
    width: 150px;
  }
  .acronym {
    width: 150px;
  }
  .role {
    width: 150px;
  }
  .salary {
    width: 150px;
  }
  .dayRate {
    width: 150px;
  }
  .location {
    width: 150px;
  }
  .hidden {
    opacity: 0;
  }
  .delete {
    height: 18px;
    width: 18px;
    margin-right: 10px;
  }
  img {
    height: 18px;
    width: 18px;
    margin: auto;
  }
  button {
    margin: 8px;
    border: none;
    padding: 0;
  }
`;
