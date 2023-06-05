import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testState: "is this testState",
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setGeneralFields: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setGeneralFields } = generalSlice.actions;

// here write actions

export default generalSlice.reducer;
