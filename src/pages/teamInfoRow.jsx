import React from "react";
import { useDispatch } from "react-redux";
import { updateTeamMember, deleteTeamMember } from "../store/projectData/team";
import { isNumberKey } from "../helpers";
import { removePersonAllocations } from "../store/projectData/allocations";
import bin from "../images/bin-grey.png";

function TeamInfoRow(props) {
  const dispatch = useDispatch();
  const { person } = props;

  function onChangeHandler(e) {
    const key = e.target.name
    let value = e.target.value
    if (key === 'salary') {
      if (!e.target.value) value = 0;
      value = parseInt(value)
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
      <input
        id={person.personId + "salary"}
        name="salary"
        value={person.salary}
        onKeyDown={(e) => isNumberKey(e)}
        onChange={onChangeHandler}
        className="field salary"
      />
      <div className="hidden">
        <img
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={deletePerson}
        />
        {/* <BiTrash
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(dAndMRowRemoved(task.taskId))}
              /> */}
      </div>
    </div>
  );
}
export default TeamInfoRow;
