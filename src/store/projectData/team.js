// import axios from "axios";
import { createAction, createSlice, createReducer } from "@reduxjs/toolkit";
import { team } from "../../data";

const slice = createSlice({
  name: "team",
  initialState: team,
  reducers: {
    addTeamMember: (team, action) => {
      const { newPerson, position } = action.payload;
      team.data.splice(position, 0, newPerson);
    },
    deleteTeamMember: (team, action) => {
      const index = team.data.findIndex(
        (person) => person.personId === action.payload.personId
      );
      team.data.splice(index, 1);
    },
    updateTeamMember: (team, action) => {
      const index = team.data.findIndex(
        (person) => person.personId === action.payload.personId
      );
      if (action.payload.key === "name") {
        const matches = action.payload.value.match(/\b(\w)/g) || [];
        const acronym = matches.join("").slice(0, 2);
        team.data[index].name = action.payload.value;
        team.data[index].acronym = acronym;
      } else if (action.payload.key === "acronym") {
        const acronym = action.payload.value.slice(-2);
        team.data[index].acronym = acronym;
      } else team.data[action.payload.key] = action.payload.value;
    },
    reorderTeam: (team, action) => {
      const originalIndex = team.data.findIndex(
        (person) => person.personId === action.payload.person.personId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [person] = team.data.splice(originalIndex, 1);
      team.data.splice(newIndex, 0, person);
    },
  },
});

export const {
  reorderTeam,
  updateTeamMember,
  addTeamMember,
  deleteTeamMember,
} = slice.actions;
export default slice.reducer;

// export const setTaskBars = createAction("setTaskBars");
// export const reorderTeam = createAction("reorderTeam");
// export const updateTeamMember = createAction("updateTeamMember");
// export const addTeamMember = createAction("addTeamMember");
// export const deleteTeamMember = createAction("deleteTeamMember");

// export createReducer(team, {
//   // key: value,
//   // action: functions to handle the actions
//   [addTeamMember.type]: (team, action) => {
//     const { newPerson, position } = action.payload;
//     // team.data.push(newPerson);
//     team.data.splice(position, 0, newPerson);
//   },
//   [deleteTeamMember.type]: (team, action) => {
//     const index = team.data.findIndex(
//       (person) => person.personId === action.payload.personId
//     );
//     team.data.splice(index, 1);
//   },
//   [updateTeamMember.type]: (team, action) => {
//     const index = team.data.findIndex(
//       (person) => person.personId === action.payload.personId
//     );
//     if (action.payload.key === "name") {
//       const matches = action.payload.value.match(/\b(\w)/g) || [];
//       const acronym = matches.join("").slice(0, 2);
//       team.data[index].name = action.payload.value;
//       team.data[index].acronym = acronym;
//     } else if (action.payload.key === "acronym") {
//       const acronym = action.payload.value.slice(-2);
//       team.data[index].acronym = acronym;
//     } else team.data[action.payload.key] = action.payload.value;
//   },
//   [reorderTeam.type]: (team, action) => {
//     console.log(action.payload);
//     const originalIndex = team.data.findIndex(
//       (person) => person.personId === action.payload.person.personId
//     );
//     const newIndex = originalIndex + action.payload.movement;
//     const [person] = team.data.splice(originalIndex, 1);
//     team.data.splice(newIndex, 0, person);
//   },
// });
