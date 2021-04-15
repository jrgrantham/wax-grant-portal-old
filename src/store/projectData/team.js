// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
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
      const {key, value, personId} = action.payload;
      const index = team.data.findIndex(
        (person) => person.personId === personId
      );
      if (key === "name") {
        const matches = value.match(/\b(\w)/g) || [];
        const acronym = matches.join("").slice(0, 2);
        team.data[index].name = value;
        team.data[index].acronym = acronym;
      } else if (key === "acronym") {
        const acronym = value.slice(-2);
        team.data[index].acronym = acronym;
      } else team.data[index][key] = value;
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