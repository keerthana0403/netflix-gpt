import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMovie from "../components/MainMovie";

import {
  getNowPlayingMovies,
  getPopularMovies,
} from "../store/actions/movieAction";
import {
  getTopRatedMovies,
  getUpcomingMovies,
} from "../store/actions/movieAction";

import { getWatchListMovies } from "../store/actions/watchListAction";
import MovieList from "../skeletons/MovieList";
import HomeSkeleton from "../skeletons/Home";

const MovieListComponent = lazy(() => import("../components/MovieList"));

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
    return <HomeSkeleton />;

  if (user && !watchList) return <HomeSkeleton />;

  const movieLists = [
    { title: "Now Playing", movies: nowPlayingMovies },
    { title: "Popular", movies: popularMovies },
    { title: "Top Rated", movies: topRatedMovies },
    { title: "Upcoming", movies: upcoming },
  ];

  return (
    <div className=" bg-black">
      {console.log("Home Lazy Load")}
      <MainMovie movie={nowPlayingMovies[0]} />
      <Suspense fallback={<MovieList />}>
        {movieLists.map(({ title, movies }) => (
          <MovieListComponent key={title} title={title} movies={movies} />
        ))}
      </Suspense>
    </div>
  );
};

export default Home;
