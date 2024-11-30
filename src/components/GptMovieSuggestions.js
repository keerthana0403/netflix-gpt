import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

import GptMovies from "../skeletons/GptMovies";
import { setContentType } from "../store/reducers/contentType";

const GptMovieSuggestions = () => {
  const truncate = (str, len) => {
    if (str.length < len) return str;
    return str.slice(0, len) + "...";
  };

  const dispatch = useDispatch();

  const { movies, message, isLoading } = useSelector(
    (store) => store.gptSearch
  );

  if (!movies || isLoading) return <GptMovies />;

  return (
    <div className=" w-full max-w-3xl mx-auto ">
      {movies.length ? (
        <div className="m-4  text-white  flex flex-col justify-center ">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="m-2  bg-black flex items-center rounded-lg  border border-gray-900 shadow shadow-gray-500"
            >
              <Link
                key={movie.id}
                to={"/watch/" + movie.id}
                className="max-w-[250px] relative group"
                onClick={() => dispatch(setContentType(movie.type))}
              >
                <MovieCard key={movie.id} movie={movie} />
              </Link>
              <div className="text-gray-100 ml-5">
                <h1 className="font-bold">
                  {movie.title || movie.original_title || movie.original_name}
                </h1>

                <p className="text-gray-500">{movie.release_date}</p>
                <p className="w-full    text-gray-300">
                  {truncate(movie.overview, 80)}
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
