import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import TeamInfoRow from "./teamRow";
import { tableHeadingHeight } from "../helpers";
import { addTeamMember } from "../store/projectData/team";
import { useSelector } from "react-redux";
import add from "../images/add-grey.png";

function TeamHeader(props) {
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
    dispatch(addTeamMember(newPerson));
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
        </div>
      </div>
      <div className="people">
        {group.map((person, index) => {
          return (
            <TeamInfoRow
              employmentType={employmentType}
              key={index}
              person={person}
            />
          );
        })}
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
  }
  .person {
    display: flex;
    align-items: center;
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
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
  img {
    max-height: 18px;
    max-width: 18px;
  }
  button {
    margin: 8px;
    border: none;
    padding: 0;
  }
`;
