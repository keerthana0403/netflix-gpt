import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints, options } from "../../services/movieServices";

export const getNowPlayingMovies = createAsyncThunk(
  "getNowPlayingMovies",
  async () => {
    const data = await fetch(endpoints.nowPlayingMovies, options);
    const json = await data.json();
    return json.results;
  }
);

export const getPopularMovies = createAsyncThunk(
  "getpopularMovies",
  async () => {
    const data = await fetch(endpoints.popular, options);
    const json = await data.json();
    return json.results;
  }
);

export const getTopRatedMovies = createAsyncThunk(
  "getTopRatedMovies",
  async () => {
    const data = await fetch(endpoints.topRatedMovies, options);
    const json = await data.json();
    return json.results;
  }
);

export const getUpcomingMovies = createAsyncThunk(
  "getUpcomingMovies",
  async () => {
    const data = await fetch(endpoints.upcoming, options);
    const json = await data.json();
    return json.results;
  }
);

export const getTrendingMovies = createAsyncThunk(
  "getTrendingMovies",
  async () => {
    const data = await fetch(endpoints.trending, options);
    const json = await data.json();
    return json.results;
  }
);
