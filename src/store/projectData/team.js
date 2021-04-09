// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import { team } from "../../data";

// export const setTaskBars = createAction("setTaskBars");
export const reorderTasks = createAction("reorderTasks");
export const updateTeamMember = createAction("updateTeamMember");
export const addTeamMember = createAction("addTeamMember");
export const deleteTeamMember = createAction("deleteTeamMember");

export default function project(state = team, action) {
  switch (action.type) {
    case updateTeamMember.type:
      return {
        ...state,
        data: state.data.map((person) => {
          if (person.personId === action.payload.personId) {
            if (action.payload.key === "name") {
              const matches = action.payload.value.match(/\b(\w)/g) || [];
              const acronym = matches.join("").slice(0, 2);
              return {
                ...person,
                [action.payload.key]: action.payload.value,
                acronym,
              };
            } else if (action.payload.key === "acronym") {
              const acronym = action.payload.value.slice(-2);
              return {
                ...person,
                acronym,
              }
            } else
              return {
                ...person,
                [action.payload.key]: action.payload.value,
              };
          } else return person;
        }),
      };
    case deleteTeamMember.type:
      return {
        ...state,
        data: state.data.filter(
          (person) => person.personId !== action.payload.personId
        ),
      };
    case addTeamMember.type:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.concat(action.payload),
      };
    default:
      return state;
  }
}
