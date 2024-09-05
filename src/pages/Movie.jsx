import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useMovieDetails from "../hooks/useMovieDetails";
import { movieImage } from "../utils/constants";
import MovieSkeleton from "../skeletons/Movie";
import Header from "../components/Header";
import {
  ChevronLeft,
  ChevronRight,
  CheckCheck,
  SquarePlus,
} from "lucide-react";
import ReactPlayer from "react-player";

import { useDispatch, useSelector } from "react-redux";

import {
  addMovieToWatchlist,
  getWatchListMovies,
  removeMovieFromWatchlist,
} from "../store/actions/watchListAction";

import { movieTrailers, similarContent } from "../services/movieServices";
import MovieList from "../components/MovieList";

const Movie = () => {
  const user = useSelector((store) => store.auth.user);
  const contentType = useSelector((store) => store.contentType.contentType);
  const watchList = useSelector((store) => store.watchList.movies);

  const [trailers, setTrailers] = useState([]);
  const [similarContentList, setSimilarContentList] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);

  const dispatch = useDispatch();

  const [like, setLike] = useState(false);

  const { id } = useParams();

  const movie = useMovieDetails(contentType, id);

  const trailer = movieTrailers(contentType, id);

  const similar = similarContent(contentType, id);

  useEffect(() => {
    dispatch(getWatchListMovies(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    setLike(false);
    watchList.forEach((ele) => {
      if (ele.id === Number(id)) {
        setLike(true);
        return;
      }
    });
  }, [watchList, id]);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const data = await fetch(trailer);
        const json = await data.json();
        setTrailers(json.results);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [trailer]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const data = await fetch(similar);
        const json = await data.json();
        setSimilarContentList(json.results);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContentList([]);
        }
      }
    };
    getSimilarContent();
  }, [similar]);

  if (!movie || !watchList || !trailers || !similarContentList)
    return <MovieSkeleton />;

  const markFavShow = () => {
    const userId = user?.uid;
    if (userId) {
      if (!like) {
        dispatch(addMovieToWatchlist({ movie, userId, contentType }));
      } else {
        dispatch(removeMovieFromWatchlist({ movie, userId }));
      }
      setLike(!like);
    }
  };

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Header />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
              }}
							`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed "
                  : ""
              }}
							`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-10 ">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {movie?.title || movie?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {movie?.title || movie?.name}
            </h2>

            <div className="mt-2 text-lg flex flex-row">
              {movie?.release_date || movie?.first_air_date} |{" "}
              {movie?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
              |{"  "}
              {like ? (
                <span
                  className="flex flex-row items-center ml-2 cursor-pointer"
                  onClick={markFavShow}
                >
                  <CheckCheck size={20} color="#5dd52a" />
                  <p className="ml-1">Added</p>
                </span>
              ) : (
                <span
                  className="flex flex-row items-center ml-2 cursor-pointer"
                  onClick={markFavShow}
                >
                  <SquarePlus size={20} />
                  <p className="ml-1">Watchlist</p>
                </span>
              )}
            </div>
            <p className="mt-4 text-lg">{movie?.overview}</p>
          </div>
          {movie?.backdrop_path ? (
            <img
              className="max-h-[600px] rounded-md"
              src={movieImage(movie?.backdrop_path, "w500")}
              alt={movie?.title}
            />
          ) : (
            <img
              className="max-h-[300px] max-w-[600px] rounded-md"
              src={movieImage(movie?.poster_path, "original")}
              alt={movie?.title}
            />
          )}
        </div>

        {similarContentList.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto relative">
            <MovieList
              title={"Similar Movies/Tv Show"}
              movies={similarContentList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
