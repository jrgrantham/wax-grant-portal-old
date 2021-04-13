import React from "react";
import { useDispatch } from "react-redux";
import {
  updateTeamMember,
  deleteTeamMember,
} from "../../store/projectData/team";
import Tippy from "@tippy.js/react";
import "react-tippy/dist/tippy.css";
import { BiMenu, BiDotsHorizontalRounded } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import { removePersonAllocations } from "../../store/projectData/allocations";
import bin from "../../images/bin-grey.png";
import add from "../../images/add-grey.png";

function TeamRow(props) {
  const dispatch = useDispatch();
  const { person, employmentType, provided, index, acronyms } = props;

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
        <Tippy delay={250} content="Team member">
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
        className={acronyms[person.acronym] > 1 ? "field acronym duplicate" : "field acronym"}
      />
      {index === 0 ? (
        <Tippy delay={250} content="Acronym">
          <div className="info">
            <img src={add} alt="add" />
          </div>
        </Tippy>
      ) : (
        <div className="info"></div>
      )}
      <input
        id={person.personId + "role"}
        name="role"
        value={person.role}
        onChange={onChangeHandler}
        className="field role"
      />
      {index === 0 ? (
        <Tippy delay={250} content="Role">
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
            <Tippy delay={250} content="Salary (£)">
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
            <Tippy delay={250} content="Day rate (£)">
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
            <Tippy delay={250} content="Location">
              <div className="info">
                <img src={add} alt="add" />
              </div>
            </Tippy>
          ) : (
            <div className="info"></div>
          )}
        </>
      )}
      <button className="profile">Profile</button>
      <Tippy delay={250} content="All data will be lost">
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
