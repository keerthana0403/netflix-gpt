import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import moviesReducer from "./reducers/moviesSlice";
import tvshowsReducer from "./reducers/tvshowsSlice";
import watchListReducer from "./reducers/watchlistSlice";
import gptSearchReducer from "./reducers/gptSearchSlice";
import contentType from "./reducers/contentType";

const appStore = configureStore({
  reducer: {
    auth: userReducer,
    movies: moviesReducer,
    tvshows: tvshowsReducer,
    watchList: watchListReducer,
    gptSearch: gptSearchReducer,
    contentType: contentType,
  },
});

export default appStore;
