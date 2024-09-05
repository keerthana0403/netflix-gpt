import { createSlice } from "@reduxjs/toolkit";
import {
  getAiringToday,
  getOnTheAir,
  getPopular,
  getTopRated,
  getTrendingShows,
} from "../actions/tvshowsAction";

const tvshowsSlice = createSlice({
  name: "tvshows",
  initialState: {
    airing_today: null,
    on_the_air: null,
    popular: null,
    top_rated: null,
    trending: null,
    isLoading: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getAiringToday.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAiringToday.fulfilled, (state, action) => {
      state.airing_today = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAiringToday.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getOnTheAir.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOnTheAir.fulfilled, (state, action) => {
      state.on_the_air = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOnTheAir.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getPopular.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPopular.fulfilled, (state, action) => {
      state.popular = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPopular.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getTopRated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopRated.fulfilled, (state, action) => {
      state.top_rated = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTopRated.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //

    builder.addCase(getTrendingShows.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTrendingShows.fulfilled, (state, action) => {
      state.trending = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTrendingShows.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default tvshowsSlice.reducer;
