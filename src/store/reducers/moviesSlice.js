import { createSlice } from "@reduxjs/toolkit";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../actions/movieAction";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcoming: null,
    isLoading: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getNowPlayingMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNowPlayingMovies.fulfilled, (state, action) => {
      state.nowPlayingMovies = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getNowPlayingMovies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getPopularMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPopularMovies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getTopRatedMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
      state.topRatedMovies = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTopRatedMovies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getUpcomingMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUpcomingMovies.fulfilled, (state, action) => {
      state.upcoming = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUpcomingMovies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //
  },
});

export default moviesSlice.reducer;
