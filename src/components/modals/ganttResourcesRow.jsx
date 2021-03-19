import React from "react";
import { useDispatch } from "react-redux";
import { wPResourcesUpdated } from "../../store/projectData/workPackages";

function ResourcesRow(props) {
  const dispatch = useDispatch();
  const { allPeople, task } = props;

  let taskPercentage = 0;
  for (const person in task.resources) {
    if (task.resources[person] > 0) taskPercentage += task.resources[person];
  }

  const completion =
    taskPercentage === 100
      ? "ok total"
      : taskPercentage < 100
      ? "under total"
      : "over total";

  function onChangeHandler(e, taskId, person) {
    dispatch(
      wPResourcesUpdated({
        name: person,
        value: parseInt(e.target.value),
        taskId,
      })
    );
  }
  const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="modalRow">
      <p className="description">{task.description}</p>
      {allPeople.map((person, index) => {
        return (
          <select
            className="person select"
            key={index}
            value={task.resources[person.acronym]}
            onChange={(e) => onChangeHandler(e, task.taskId, person.acronym)}
            id="resources"
            name="resources"
          >
            {percentages.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        );
      })}
      <p className={completion}>{taskPercentage}%</p>
    </div>
  );
}

export default ResourcesRow;
