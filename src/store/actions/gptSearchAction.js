import { createAsyncThunk } from "@reduxjs/toolkit";
import { movieDetailsWithName, options } from "../../services/movieServices";

export const getGptResult = createAsyncThunk(
  "getGptResult",
  async (movieList) => {
    try {
      const promiseArray = movieList.map(async (movie) => {
        const movieUrl = movieDetailsWithName(movie?.type, movie?.name);
        const data = await fetch(movieUrl, options);
        const json = await data.json();
        const movieResult = { ...json.results[0], type: movie?.type };
        return movieResult;
      });
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      return tmdbResults;
    } catch (error) {
      console.log(error);
    }
  }
);
