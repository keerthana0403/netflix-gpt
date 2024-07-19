import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMovie from "../components/MainMovie";

import MovieList from "../components/MovieList";

import {
  getNowPlayingMovies,
  getPopularMovies,
} from "../store/actions/movieAction";
import {
  getTopRatedMovies,
  getUpcomingMovies,
} from "../store/actions/movieAction";

import Loading from "../components/Loading";
import { getWatchListMovies } from "../store/actions/watchListAction";

const Home = () => {
  const dispatch = useDispatch();
  const { nowPlayingMovies, popularMovies, topRatedMovies, upcoming } =
    useSelector((store) => store.movies);
  const user = useSelector((store) => store.auth.user);
  const watchList = useSelector((store) => store.watchList.movies);

  useEffect(() => {
    dispatch(getNowPlayingMovies());
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getUpcomingMovies());

    if (user) {
      dispatch(getWatchListMovies(user.uid));
    }
  }, [user, dispatch]);

  if (!nowPlayingMovies || !popularMovies || !topRatedMovies || !upcoming)
    return <Loading />;

  if (user && !watchList) return <Loading />;

  const movieLists = [
    { title: "Now Playing", movies: nowPlayingMovies },
    { title: "Popular", movies: popularMovies },
    { title: "Top Rated", movies: topRatedMovies },
    { title: "Upcoming", movies: upcoming },
  ];

  return (
    <div className=" bg-black">
      <MainMovie movie={nowPlayingMovies[0]} />
      {movieLists.map(({ title, movies }) => (
        <MovieList key={title} title={title} movies={movies} />
      ))}
    </div>
  );
};

export default Home;
