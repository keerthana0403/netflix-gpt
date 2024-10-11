import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getTrendingMovies,
} from "../store/actions/movieAction";
import {
  getAiringToday,
  getOnTheAir,
  getPopular,
  getTopRated,
  getTrendingShows,
} from "../store/actions/tvshowsAction";

import HomeSkeleton from "../skeletons/Home";
import Header from "../components/Header";
import MainMovie from "../components/MainMovie";
import Loading from "../components/Loading";

const MovieListComponent = lazy(() => import("../components/MovieList"));

const Home = () => {
  const dispatch = useDispatch();
  const contentType = useSelector((store) => store.contentType.contentType);
  const movies = useSelector((store) => store.movies);
  const tvShows = useSelector((store) => store.tvshows);

  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcoming,
    trending: trendingMovies,
  } = movies;

  const {
    airing_today,
    on_the_air,
    popular,
    top_rated,
    trending: trendingShows,
  } = tvShows;

  useEffect(() => {
    if (contentType === "movie") {
      if (!nowPlayingMovies) dispatch(getNowPlayingMovies());
      if (!popularMovies) dispatch(getPopularMovies());
      if (!topRatedMovies) dispatch(getTopRatedMovies());
      if (!upcoming) dispatch(getUpcomingMovies());
      if (!trendingMovies) dispatch(getTrendingMovies());
    }

    if (contentType === "tv") {
      if (!airing_today) dispatch(getAiringToday());
      if (!on_the_air) dispatch(getOnTheAir());
      if (!popular) dispatch(getPopular());
      if (!top_rated) dispatch(getTopRated());
      if (!trendingShows) dispatch(getTrendingShows());
    }
  }, [
    dispatch,
    contentType,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcoming,
    trendingMovies,
    airing_today,
    on_the_air,
    popular,
    top_rated,
    trendingShows,
  ]);

  const movieLists = useMemo(
    () => [
      { title: "Now Playing", movies: nowPlayingMovies },
      { title: "Popular", movies: popularMovies },
      { title: "Top Rated", movies: topRatedMovies },
      { title: "Upcoming", movies: upcoming },
    ],
    [nowPlayingMovies, popularMovies, topRatedMovies, upcoming]
  );

  const tvShowLists = useMemo(
    () => [
      { title: "Airing Today", shows: airing_today },
      { title: "On The Air", shows: on_the_air },
      { title: "Popular", shows: popular },
      { title: "Top Rated", shows: top_rated },
    ],
    [airing_today, on_the_air, popular, top_rated]
  );

  const trendingMovie = useMemo(() => {
    return trendingMovies
      ? trendingMovies[Math.floor(Math.random() * trendingMovies.length)]
      : null;
  }, [trendingMovies]);

  const trendingShow = useMemo(() => {
    return trendingShows
      ? trendingShows[Math.floor(Math.random() * trendingShows.length)]
      : null;
  }, [trendingShows]);

  if (
    contentType === "movie" &&
    (!nowPlayingMovies ||
      !popularMovies ||
      !topRatedMovies ||
      !upcoming ||
      !trendingMovies)
  ) {
    return <HomeSkeleton />;
  }

  if (
    contentType === "tv" &&
    (!airing_today || !on_the_air || !popular || !top_rated || !trendingShows)
  ) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="relative h-screen text-white">
        <Header />
        <MainMovie
          movie={contentType === "movie" ? trendingMovie : trendingShow}
        />
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        <Suspense fallback={<Loading />}>
          {contentType === "movie"
            ? movieLists.map(({ title, movies }) => (
                <MovieListComponent key={title} title={title} movies={movies} />
              ))
            : tvShowLists.map(({ title, shows }) => (
                <MovieListComponent key={title} title={title} movies={shows} />
              ))}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
