import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

function ResourcesRow(props) {
  const dispatch = useDispatch();
  const { allPeople, row } = props;

  // {
  //   under: "under total",
  //   ok: "green total",
  //   over: "over total",
  // };

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
    console.log(e.target.name, e.target.value, rowId, person);
  }
  const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <Container>
      <div className="modalRow">
        <p className="description">{row.description}</p>
        {allPeople.map((person, index) => {
          return (
            <select
              className="person"
              key={index}
              value={row.resources[person] + "%"}
              onChange={(e) => onChangeHandler(e, row.rowId, person)}
              id="resources"
              name="resources"
            >
              {percentages.map((option, index) => {
                return <option key={index}>{option}%</option>;
              })}
            </select>
          );
        })}
        <p className={completion}>{taskPercentage}%</p>
      </div>
    </Container>
  );
}

export default ResourcesRow;

const Container = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .description {
    min-width: 200px;
    max-width: 300px;
  }
  .person {
    width: 50px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid lightgray;
  }
  .total {
    width: 50px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-weight: 600;
  }
  .under {
    color: orange;
  }
  .ok {
    color: green;
  }
  .over {
    color: red;
  }
`;
