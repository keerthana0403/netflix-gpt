import { createAsyncThunk } from "@reduxjs/toolkit";
import { options, tvEndpoints } from "../../services/movieServices";

export const getAiringToday = createAsyncThunk("getAiringToday", async () => {
  const data = await fetch(tvEndpoints.airingToday, options);
  const json = await data.json();
  return json.results;
});

export const getOnTheAir = createAsyncThunk("getOnTheAir", async () => {
  const data = await fetch(tvEndpoints.onTheAir, options);
  const json = await data.json();
  return json.results;
});

export const getPopular = createAsyncThunk("getPopular", async () => {
  const data = await fetch(tvEndpoints.popular, options);
  const json = await data.json();
  return json.results;
});

export const getTopRated = createAsyncThunk("getTopRated", async () => {
  const data = await fetch(tvEndpoints.topRated, options);
  const json = await data.json();
  return json.results;
});

export const getTrendingShows = createAsyncThunk(
  "getTrendingShows",
  async () => {
    const data = await fetch(tvEndpoints.trending, options);
    const json = await data.json();
    return json.results;
  }
);
