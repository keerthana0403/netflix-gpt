import { createSlice } from "@reduxjs/toolkit";
import { getGptResult } from "../actions/gptSearchAction";

const gptSearchSlice = createSlice({
  name: "gptMovies",
  initialState: {
    showGptSearch: false,
    movies: [],
    message: null,
    isLoading: null,
    isError: false,
  },

  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addMessage: (state, action) => {
      state.message = action.payload;
      state.movies = [];
    },
    removeData: (state) => {
      state.showGptSearch = false;
      state.movies = [];
      state.message = null;
      state.isLoading = null;
      state.isError = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGptResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGptResult.fulfilled, (state, action) => {
      if (action.payload != null) state.movies = [...action.payload];
      state.message = null;
      state.isLoading = false;
    });
    builder.addCase(getGptResult.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.movies = [];
      state.message = null;
    });
  },
});

export const { addMessage, toggleGptSearchView, removeData } =
  gptSearchSlice.actions;
export default gptSearchSlice.reducer;
