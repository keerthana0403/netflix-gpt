import { createAsyncThunk } from "@reduxjs/toolkit";
import { tvEndpoints } from "../../services/movieServices";

export const getAiringToday = createAsyncThunk("getAiringToday", async () => {
  const data = await fetch(tvEndpoints.airingToday);
  const json = await data.json();
  return json.results;
});

export const getOnTheAir = createAsyncThunk("getOnTheAir", async () => {
  const data = await fetch(tvEndpoints.onTheAir);
  const json = await data.json();
  return json.results;
});

export const getPopular = createAsyncThunk("getPopular", async () => {
  const data = await fetch(tvEndpoints.popular);
  const json = await data.json();
  return json.results;
});

export const getTopRated = createAsyncThunk("getTopRated", async () => {
  const data = await fetch(tvEndpoints.topRated);
  const json = await data.json();
  return json.results;
});

export const getTrendingShows = createAsyncThunk(
  "getTrendingShows",
  async () => {
    const data = await fetch(tvEndpoints.trending);
    const json = await data.json();
    return json.results;
  }
);
