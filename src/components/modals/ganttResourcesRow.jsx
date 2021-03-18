import React from "react";
import { useDispatch } from "react-redux";
import { wPResourcesUpdated } from "../../store/projectData/workPackages";

function ResourcesRow(props) {
  const dispatch = useDispatch();
  const { allPeople, row } = props;

  let taskPercentage = 0;
  for (const person in row.resources) {
    // console.log(`${person}: ${resources[person]}`);
    if (row.resources[person] > 0) taskPercentage += row.resources[person];
  }

  const completion =
    taskPercentage === 100
      ? "ok total"
      : taskPercentage < 100
      ? "under total"
      : "over total";

  function onChangeHandler(e, rowId, person) {
    console.log(e.target.value, rowId, person);
    dispatch(
      wPResourcesUpdated({
        name: person,
        value: parseInt(e.target.value),
        rowId,
      })
    );
  }
  const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
      <div className="modalRow">
        <p className="description">{row.description}</p>
        {allPeople.map((person, index) => {
          return (
            <select
              className="person select"
              key={index}
              value={row.resources[person]}
              onChange={(e) => onChangeHandler(e, row.rowId, person)}
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