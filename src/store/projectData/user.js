// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    selectedLeader: "lead",
    selectedAdminOption: "project",
    selectedProjectOption: "company",
    selectedTeamOption: "staff",
    selectedCostsOption: "labour",
    selectedRevenueOption: "targetMarket",
  },
  reducers: {
    updateUserOption: (user, action) => {
      user[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateUserOption } = slice.actions;
export default slice.reducer;
