import { createSlice } from "@reduxjs/toolkit";

const columnSlice = createSlice({
  name: "columns",
  initialState: {
    list: [] as string[], // this holds only column values e.g ["id", "name"]
  },
  reducers: {
    save: (state, action) => {
      state.list = action.payload; // Replace old list with new list
    }
  }
});

export const { save } = columnSlice.actions;
export default columnSlice.reducer;
