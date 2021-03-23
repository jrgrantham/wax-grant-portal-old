import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { wPResourcesUpdated } from "../../store/projectData/tasks";
import { allResources } from "../../store";

function ResourcesRow(props) {
  // const dispatch = useDispatch();
  const { allPeople, task } = props;

  const completion = allResources[task.taskId].completion;
  const status =
    completion === 100
      ? "ok total"
      : completion < 100
      ? "under total"
      : "over total";

  function onChangeHandler(value, personId, allocationId) {
    // console.log(value, personId, allocationId);
    // dispatch(
    //   wPResourcesUpdated({
    //     name: person,
    //     value: parseInt(e.target.value),
    //     taskId,
    //   })
    // );
  }
  const percentages = [];
  let i = 0;
  while (i <= 100) {
    percentages.push(i);
    i = i + 5;
  }

  return (
    <div className="modalRow">
      <p className="description">{task.description}</p>
      {allPeople.map((person, index) => {
        return (
          <select
            className="person select"
            key={index}
            value={allResources[task.taskId][person.acronym].percent}
            onChange={(e) =>
              onChangeHandler(
                e.target.value,
                person.personId,
                allResources[task.taskId][person.acronym].allocationId,
              )
            }
            id={allResources[task.taskId][person.acronym].allocationId}
            name="resources"
          >
            {percentages.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        );
      })}
      <p className={status}>{completion}%</p>
    </div>
  );
}

export default ResourcesRow;
