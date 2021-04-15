import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import ProfileModal from "../modals/teamProfileModal";

function ProjectRow(props) {
  const dispatch = useDispatch();
  const { projectRoles, locations } = useSelector(
    (state) => state.options.data
  );
  const { person, employmentType, provided, acronyms } = props;
  const [showProfile, setShowProfile] = useState(false);

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "salary" || key === "dayRate") {
      if (e.target.value) {
        value = parseInt(value.slice(-6));
      } else value = 0;
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
        {projectRoles.map((role, index) => {
          return (
            <option key={index} value={role}>
              {role}
            </option>
          );
        })}
      </datalist>

      {employmentType === "staff" ? (
        <input
          id={person.personId + "salary"}
          name="salary"
          value={person.salary}
          onKeyDown={(e) => isNumberKey(e)}
          onChange={onChangeHandler}
          className="field salary"
        />
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
          {/* <input
            id={person.personId + "location"}
            name="location"
            value={person.location}
            onChange={onChangeHandler}
            className="field location"
          /> */}
          <select
            className="field location"
            id={person.personId + "location"}
            name="location"
            value={person.location}
            onChange={onChangeHandler}
          >
            {locations.map((location, index) => {
              return (
                <option key={index} value={location}>
                  {location}
                </option>
              );
            })}
          </select>
        </>
      )}
      <button onClick={() => setShowProfile(true)} className="profile">
        Profile
      </button>
      <Tippy content="Associated data will be lost">
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
export default ProjectRow;
