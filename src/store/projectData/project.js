// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { projectData } from "../../data";

const slice = createSlice({
  name: "project",
  initialState: projectData,
  reducers: {
    updateUserSelection: (user, action) => {
      user[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateUserSelection } = slice.actions;
export default slice.reducer;
