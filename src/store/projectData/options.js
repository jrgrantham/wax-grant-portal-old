// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { options } from "../../data";

const slice = createSlice({
  name: "options",
  initialState: options,
  reducers: {
    
  },
});

export const {
} = slice.actions;
export default slice.reducer;