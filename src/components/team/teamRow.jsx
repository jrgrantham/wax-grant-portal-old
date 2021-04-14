import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateTeamMember,
  deleteTeamMember,
} from "../../store/projectData/team";
import Tippy from "@tippy.js/react";
import "react-tippy/dist/tippy.css";
import { BiMenu } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import { removePersonAllocations } from "../../store/projectData/allocations";
import bin from "../../images/bin-grey.png";
import add from "../../images/add-grey.png";
import ProfileModal from "../modals/teamProfileModal";

function TeamRow(props) {
  const dispatch = useDispatch();
  const { person, employmentType, provided, index, acronyms } = props;
  const [showProfile, setShowProfile] = useState(false);

  const roleOptions = [
    "General Manager",
    "Supervisor",
    "Accounts",
    "Human Resources",
  ];

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "salary" || key === "dayRate") {
      if (!e.target.value) value = 0;
      value = parseInt(value);
    }
    dispatch(
      updateTeamMember({
        personId: person.personId,
        key,
        value,
      })
    );
  }

  function deletePerson() {
    dispatch(deleteTeamMember({ personId: person.personId }));
    dispatch(removePersonAllocations({ personId: person.personId }));
  }

  return (
    <div className="person">
      {showProfile ? (
        <ProfileModal setShowProfile={setShowProfile} person={person} />
      ) : null}
      <div {...provided.dragHandleProps} className="hidden menu">
        <BiMenu />
      </div>
      <input
        id={person.personId + "name"}
        name="name"
        value={person.name}
        onChange={onChangeHandler}
        className="field name"
      />
      {index === 0 ? (
        <Tippy content="Team member">
          <div className="info">
            <img src={add} alt="add" />
          </div>
        </Tippy>
      ) : (
        <div className="info"></div>
      )}
      <input
        id={person.personId + "acronym"}
        name="acronym"
        value={person.acronym}
        onChange={onChangeHandler}
        className={
          acronyms[person.acronym] > 1
            ? "field acronym duplicate"
            : "field acronym"
        }
      />
      {index === 0 ? (
        <Tippy content="Acronym">
          <div className="info">
            <img src={add} alt="add" />
          </div>
        </Tippy>
      ) : (
        <div className="info"></div>
      )}
      <input
        type="text"
        id={person.personId + "role"}
        name="role"
        placeholder={person.role}
        onChange={onChangeHandler}
        className="field role"
        list={`${person.personId}roleList`}
      />
      <datalist id={`${person.personId}roleList`}>
        {roleOptions.map((role, index) => {
          return (
            <option key={index} value={role}>
              {role}
            </option>
          );
        })}
      </datalist>

      {/* {inputList ? (
        <select
          id={person.personId + "role"}
          name="role"
          value={person.role}
          onChange={onChangeHandler}
          className="field role"
        >
          <option hidden>Select role...</option>
          {roleOptions.map((role, index) => {
            return <option key={index}>{role}</option>;
          })}
          <option >other...</option>
        </select>
      ) : null} */}

      {index === 0 ? (
        <Tippy content="Delete text to view list">
          <div className="info">
            <img src={add} alt="add" />
          </div>
        </Tippy>
      ) : (
        <div className="info"></div>
      )}
      {employmentType === "staff" ? (
        <>
          <input
            id={person.personId + "salary"}
            name="salary"
            value={person.salary}
            onKeyDown={(e) => isNumberKey(e)}
            onChange={onChangeHandler}
            className="field salary"
          />
          {index === 0 ? (
            <Tippy content="Salary (£)">
              <div className="info">
                <img src={add} alt="add" />
              </div>
            </Tippy>
          ) : (
            <div className="info"></div>
          )}
        </>
      ) : (
        <>
          <input
            id={person.personId + "dayRate"}
            name="dayRate"
            value={person.dayRate}
            onKeyDown={(e) => isNumberKey(e)}
            onChange={onChangeHandler}
            className="field dayRate"
          />
          {index === 0 ? (
            <Tippy content="Day rate (£)">
              <div className="info">
                <img src={add} alt="add" />
              </div>
            </Tippy>
          ) : (
            <div className="info"></div>
          )}
          <input
            id={person.personId + "location"}
            name="location"
            value={person.location}
            onChange={onChangeHandler}
            className="field location"
          />
          {index === 0 ? (
            <Tippy content="Location">
              <div className="info">
                <img src={add} alt="add" />
              </div>
            </Tippy>
          ) : (
            <div className="info"></div>
          )}
        </>
      )}
      <button onClick={() => setShowProfile(true)} className="profile">
        Profile
      </button>
      <Tippy content="All data will be lost">
        <div className="hidden">
          <img
            className="delete"
            src={bin}
            alt="delete"
            style={{ cursor: "pointer" }}
            onClick={deletePerson}
          />
        </div>
      </Tippy>
    </div>
  );
}
export default TeamRow;
