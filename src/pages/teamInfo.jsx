import React, { useState } from "react";
import styled from "styled-components";

import { tableHeadingHeight } from "../helpers";
import { useSelector } from "react-redux";

function TeamInfo() {
  const team = useSelector((state) => state.team.data);
  const [selected, setSelected] = useState("leadApp");
  return (
    <PageContainer>
      <div className="headings">
        <h3
          id="leadApp"
          className={selected === "leadApp" ? "select selected" : "select"}
          onClick={() => setSelected('leadApp')}
        >
          Lead Applicant
        </h3>
        <h3
          id="pOne"
          className={selected === "pOne" ? "select selected" : "select"}
          onClick={() => setSelected('pOne')}
        >
          Partner One
        </h3>
        <h3
          id="pTwo"
          className={selected === "pTwo" ? "select selected" : "select"}
          onClick={() => setSelected('pTwo')}
        >
          Partner Two
        </h3>
      </div>
      <div className="titles">
        <div className="person">
          <h3 className="field name">Name</h3>
          <h3 className="field acronym">Acronym</h3>
          <h3 className="field role">Role</h3>
          <h3 className="field salary">Salary</h3>
        </div>
      </div>
      <div className="people">
        {team.map((person, index) => {
          return (
            <div key={index} className="person">
              <p className="field name">{person.name}</p>
              <p className="field acronym">{person.acronym}</p>
              <p className="field role">{person.role}</p>
              <p className="field salary">{person.salary}</p>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
export default TeamInfo;

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
  .selected {
    background-color: white;
    border-radius: 5px 5px 0 0;
  }
  .field {
    padding: 5px 10px;
  }
  .person {
    display: flex;
  }
  .name {
    width: 200px;
  }
  .acronym {
    width: 200px;
  }
  .role {
    width: 200px;
  }
  .salary {
    width: 200px;
  }
`;
