import { createAsyncThunk } from "@reduxjs/toolkit";
import { movieDetailsWithName, options } from "../../services/movieServices";

export const getGptResult = createAsyncThunk(
  "getGptResult",
  async (movieList) => {
    try {
      const promiseArray = movieList.map(async (movie) => {
        const data = await fetch(movieDetailsWithName(movie), options);
        const json = await data.json();
        return json.results[0];
      });
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      return tmdbResults;
    } catch (error) {
      console.log(error);
    }
  }
);
