import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
import "react-tippy/dist/tippy.css";

import TeamInfoRow from "./teamRow";
import {
  tabHeight,
  tableRightWidth,
  // tableHeadingHeight,
  tabUnselected,
  teamColor,
  tableInputUnderline,
  tableContentTopMargin,
  tableInputMargin,
  tableInputPadding,
  tableContentSideMargin,
} from "../../helpers";
import { addTeamMember, reorderTeam } from "../../store/projectData/team";
import { useSelector } from "react-redux";
import add from "../../images/add-grey.png";
import qMark from "../../images/qMark.png";

function TeamInfo(props) {
  const dispatch = useDispatch();
  const employmentType = props.employmentType;
  const team = useSelector((state) => state.team.data);

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
    const person = group[result.source.index];
    console.log(person, movement);
    dispatch(reorderTeam({ person, movement }));
  }

  function countAcronyms() {
    const acronymCount = {};
    let result = false;
    for (let i = 0; i < team.length; i++) {
      if (acronymCount[team[i].acronym]) {
        acronymCount[team[i].acronym] = acronymCount[team[i].acronym] + 1;
      } else acronymCount[team[i].acronym] = 1;
    }
    return acronymCount;
  }
  const acronyms = countAcronyms();

  return (
    <PageContainer>
      <div className="tabs">
        <h3
          id="lead"
          className={
            selectedLeader === "lead" ? "leader selectedLeader" : "leader"
          }
          onClick={() => setSelectedLeader("lead")}
        >
          Lead Applicant
        </h3>
        <h3
          id="pOne"
          className={
            selectedLeader === "pOne"
              ? "leader selectedLeader"
              : "leader middle"
          }
          onClick={() => setSelectedLeader("pOne")}
        >
          Partner One
        </h3>
        <h3
          id="pTwo"
          className={
            selectedLeader === "pTwo" ? "leader selectedLeader" : "leader"
          }
          onClick={() => setSelectedLeader("pTwo")}
        >
          Partner Two
        </h3>
      </div>

      <div className="header">
        <div className="menu" />
        <div className="title name">
          <h3>Name</h3>
        </div>
        <div className="title acronym">
          <h3>Acronym</h3>
          <Tippy content="Identifies the team member on the Gantt Chart (red text indicates duplicate)">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        <div className="title role">
          <h3>Role</h3>
          <Tippy content="Project role (not necessarily job title)">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        {employmentType === "staff" ? (
          <div className="title salary">
            <h3>Salary</h3>
            <Tippy content="Gross salary including company NI, company pension contribution and life insurance (£)">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
        ) : (
          <>
            <div className="title dayRate">
              <h3>Day rate</h3>
              <Tippy content="Day rate (£)">
                <div className="info">
                  <img src={qMark} alt="add" />
                </div>
              </Tippy>
            </div>
            <div className="title location">
              <h3>Location</h3>
              {/* <Tippy content="Location">
                  <div className="info">
                    <img src={qMark} alt="add" />
                  </div>
                </Tippy> */}
            </div>
          </>
        )}
        <div className="delete"></div>
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
                          <TeamInfoRow
                            employmentType={employmentType}
                            provided={provided}
                            index={index}
                            key={index}
                            person={person}
                            acronyms={acronyms}
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
      </div>
      <Tippy content="Add team member">
        <button className="add" onClick={addPerson}>
          <img src={add} alt="add" />
        </button>
      </Tippy>
    </PageContainer>
  );
}
export default TeamInfo;

const PageContainer = styled.div`
  width: ${tableRightWidth};
  background-color: white;
  color: black;
  .tabs {
    height: ${tabHeight};
    display: flex;
    background-color: ${tabUnselected};
  }
  .leader {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }
  .middle {
    border-left: 2px solid rgba(0, 0, 0, 0.2);
    border-right: 2px solid rgba(0, 0, 0, 0.2);
  }
  .selectedLeader {
    background-color: white;
    color: black;
    border-radius: 6px 6px 0 0;
  }
  .header {
    display: flex;
    margin-top: ${tableContentTopMargin};
    margin-bottom: 5px;
  }
  .person {
    display: flex;
    align-items: center;
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
  }
  .title {
    display: flex;
    margin-right: 20px;
    padding: 5px 0px;
  }
  .info {
    margin: 0;
    margin-left: 7px;
    width: 13px;
    height: 13px;
  }
  .field {
    margin: ${tableInputMargin};
    padding: ${tableInputPadding};
    border-radius: 0;
    border-bottom: 2px solid ${tableInputUnderline};
    /* padding: 0; */
    &:focus {
      border: none;
      border-bottom: 2px solid ${teamColor};
    }
    /* flex-grow: 1; */
  }
  .menu {
    width: 20px;
    margin: 0px 5px 0px 8px;
    padding-top: 4px;
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }
  .name {
    width: 150px;
  }
  .acronym {
    width: 100px;
    flex-grow: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .role {
    width: 150px;
  }
  .salary {
    width: 75px;
    flex-grow: 0;
  }
  .dayRate {
    width: 90px;
  }
  .location {
    width: 75px;
  }
  .profile {
    background-color: ${teamColor};
    color: white;
    padding: 5px 10px;
  }
  .hidden {
    opacity: 0;
  }
  .delete {
    width: 18px;
    padding-top: 4px;
    margin-left: 15px;
  }
  .add {
    height: 25px;
    width: 25px;
    margin: 15px ${tableContentSideMargin} 30px ${tableContentSideMargin};
  }
  .duplicate {
    color: red;
  }
  img {
    height: 100%;
    width: 100%;
    margin: auto;
  }
  button {
    border: none;
    padding: 0;
  }
`;
