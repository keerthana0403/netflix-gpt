import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "contentType",
  initialState: {
    contentType: "movie",
    navigationSource: "Home",
  },
  reducers: {
    setContentType(state, action) {
      state.contentType = action.payload;
    },
  },
});

export const { setContentType } = contentSlice.actions;
export default contentSlice.reducer;
