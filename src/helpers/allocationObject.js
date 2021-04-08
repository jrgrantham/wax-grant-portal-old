import { store } from "../store";

export function getTeamInitialsById() {
  const team = store.getState().team.data;
  const initialsById = {};
  team.forEach((person) => {
    initialsById[person.personId] = person.acronym;
  });
  return initialsById;
}

export function getResources() {
  const resources = {};
  const team = store.getState().team.data;
  const allTasks = store.getState().tasks.data;
  const allocations = store.getState().allocations.data;

  team.forEach((person) => {
    getTeamInitialsById[person.personId] = person.acronym;
  });

  allTasks.forEach((task) => {
    const peopleKeys = {};
    team.forEach((person) => {
      peopleKeys[person.acronym] = {
        allocationId: "new",
        percent: 0,
      };
    });
    resources[task.taskId] = { completion: 0, people: "", ...peopleKeys };
  });

  for (let i = 0; i < allocations.length; i++) {
    let curTask = allocations[i].taskId;
    let curPerson = getTeamInitialsById[allocations[i].personId];

    if (resources[curTask]["people"].length > 1) {
      resources[curTask]["people"] =
        resources[curTask]["people"] + ", " + curPerson;
    } else {
      resources[curTask]["people"] =
        resources[curTask]["people"] + curPerson;
    }
    resources[curTask]["completion"] =
      resources[curTask]["completion"] + allocations[i].percent;

    resources[curTask][curPerson].percent = allocations[i].percent;
    resources[curTask][curPerson].personId = allocations[i].personId;
    resources[curTask][curPerson].allocationId = allocations[i].allocationId;
  }
  return resources;
}
