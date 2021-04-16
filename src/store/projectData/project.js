// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { projectData } from "../../data";

const slice = createSlice({
  name: "project",
  initialState: projectData,
  reducers: {
    updateProjectInfo: (project, action) => {
      project.data[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateProjectInfo } = slice.actions;
export default slice.reducer;
