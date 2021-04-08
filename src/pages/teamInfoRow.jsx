import React from "react";
import { useDispatch } from "react-redux";
import { updateTeamMember, deleteTeamMember } from "../store/projectData/team";
import bin from "../images/bin-grey.png";

function TeamInfoRow(props) {
  const dispatch = useDispatch();
  const { person } = props;

  function onChangeHandler(e) {
    dispatch(
      updateTeamMember({
        personId: person.personId,
        key: e.target.name,
        value: e.target.value,
      })
    );
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
      <p className="field acronym">{person.acronym}</p>
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
        onChange={onChangeHandler}
        className="field salary"
      />
      <div className="hidden">
        <img
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch(deleteTeamMember({ personId: person.personId }))
          }
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
