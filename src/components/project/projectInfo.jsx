import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
import "react-tippy/dist/tippy.css";

import Tabs from './projectTabs'
import TeamInfoRow from "./projectRow";
import { addTeamMember, reorderTeam } from "../../store/projectData/team";
import { useSelector } from "react-redux";
import add from "../../images/add-grey.png";
import qMark from "../../images/qMark.png";
import { PageContainer } from "./pageContainer";

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
      {Tabs(selectedLeader, setSelectedLeader)}

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


