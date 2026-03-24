import { createSlice } from "@reduxjs/toolkit";
import {
  getWatchListMovies,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../actions/watchListAction";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    isLoading: null,
    movies: [],
    isError: null,
  },

  reducers: {
    removeWatchList(state) {
      state.isLoading = null;
      state.movies = [];
      state.isError = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWatchListMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWatchListMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) state.movies = [...action.payload];
    });
    builder.addCase(getWatchListMovies.rejected, (state) => {
      state.isError = true;
    });

    //
    builder.addCase(addMovieToWatchlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addMovieToWatchlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movies.push(action.payload);
    });
    builder.addCase(addMovieToWatchlist.rejected, (state) => {
      state.isError = true;
    });

    //

    builder.addCase(removeMovieFromWatchlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeMovieFromWatchlist.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      console.log(state.movies);
    });

    builder.addCase(removeMovieFromWatchlist.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { removeWatchList } = watchListSlice.actions;

export default watchListSlice.reducer;
