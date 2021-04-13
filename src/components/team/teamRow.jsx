import React from "react";
import { useDispatch } from "react-redux";
import { updateTeamMember, deleteTeamMember } from "../../store/projectData/team";
import { BiMenu, BiDotsHorizontalRounded } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import { removePersonAllocations } from "../../store/projectData/allocations";
import bin from "../../images/bin-grey.png";

function TeamRow(props) {
  const dispatch = useDispatch();
  const { person, employmentType, provided } = props;

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "salary" || key === 'dayRate') {
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
      <input
        id={person.personId + "acronym"}
        name="acronym"
        value={person.acronym}
        onChange={onChangeHandler}
        className="field acronym"
      />
      <input
        id={person.personId + "role"}
        name="role"
        value={person.role}
        onChange={onChangeHandler}
        className="field role"
      />
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
          <input
            id={person.personId + "location"}
            name="location"
            value={person.location}
            onChange={onChangeHandler}
            className="field location"
          />
        </>
      )}
      <div className="hidden">
        <img
          className='delete'
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={deletePerson}
        />
      </div>
    </div>
  );
}
export default TeamRow;
