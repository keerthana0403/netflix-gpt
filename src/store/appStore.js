import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import moviesReducer from "./reducers/moviesSlice";
import watchListReducer from "./reducers/watchlistSlice";
import gptSearchReducer from "./reducers/gptSearchSlice";

const appStore = configureStore({
  reducer: {
    auth: userReducer,
    movies: moviesReducer,
    watchList: watchListReducer,
    gptSearch: gptSearchReducer,
  },
});

export default appStore;
