import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Link, useNavigate } from "react-router-dom";

import GptMovies from "../skeletons/GptMovies";
import { removeData } from "../store/reducers/gptSearchSlice";

const GptMovieSuggestions = () => {
  const truncate = (str, len) => {
    if (str.length < len) return str;
    return str.slice(0, len) + "...";
  };

  const dispatch = useDispatch();

  const { movies, message, isLoading } = useSelector(
    (store) => store.gptSearch
  );
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(removeData());
  }, [navigate, dispatch]);

  if (!movies || isLoading) return <GptMovies />;

  return (
    <div className=" w-full max-w-3xl mx-auto ">
      {movies.length ? (
        <div className="m-4  text-white  flex flex-col justify-center ">
          {movies.map((movie) => (
            <div className="m-2  bg-white flex items-center rounded-lg cursor-pointer">
              <Link key={movie.id} to={"/movie/" + movie.id}>
                <MovieCard movie={movie} />
              </Link>
              <div className="text-black ">
                <h1 className="font-bold">
                  {movie.title || movie.original_title}
                </h1>

                <p className="text-gray-700">{movie.release_date}</p>
                <p className="w-full hidden md:block   text-gray-500">
                  {truncate(movie.overview, 100)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : message ? (
        <div className="text-white text-center pt-[10%] ">{message}</div>
      ) : (
        <div className="text-white text-center">
          <h1 className="text-xl lg:text-3xl font-bold">
            Find the perfect movie for your mood!
          </h1>
          <p className="text-gray-300 lg:text-xl">
            Type 'comedy movies', 'crime thriller', or any genre to see
            recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default GptMovieSuggestions;
