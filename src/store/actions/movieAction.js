import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../services/movieServices";

export const getNowPlayingMovies = createAsyncThunk(
  "getNowPlayingMovies",
  async () => {
    const data = await fetch(endpoints.nowPlayingMovies);
    const json = await data.json();
    return json.results;
  }
);

export const getPopularMovies = createAsyncThunk(
  "getpopularMovies",
  async () => {
    const data = await fetch(endpoints.popular);
    const json = await data.json();
    return json.results;
  }
);

export const getTopRatedMovies = createAsyncThunk(
  "getTopRatedMovies",
  async () => {
    const data = await fetch(endpoints.topRatedMovies);
    const json = await data.json();
    return json.results;
  }
);

export const getUpcomingMovies = createAsyncThunk(
  "getUpcomingMovies",
  async () => {
    const data = await fetch(endpoints.upcoming);
    const json = await data.json();
    return json.results;
  }
);

export const getTrendingMovies = createAsyncThunk(
  "getTrendingMovies",
  async () => {
    const data = await fetch(endpoints.trending);
    const json = await data.json();
    return json.results;
  }
);
