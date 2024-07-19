import React from "react";
import { movieImage } from "../utils/constants";
import Loading from "./Loading";

const MainMovie = ({ movie }) => {
  if (!movie) return <Loading />;

  const { title, backdrop_path, release_date, poster_path, overview } = movie;

  const truncate = (str, len) => {
    if (str.length < len) return str;
    return str.slice(0, len) + "...";
  };
  return (
    <div className="w-full h-[450px] md:h-[550px] select-none">
      <div className="w-full h-full">
        <div className="absolute w-full h-[450px] md:h-[550px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full  object-cover object-top"
          src={movieImage(backdrop_path ?? poster_path, "original")}
          alt={title}
        />
        <div className="absolute w-full top-[10%] md:top-[20%] lg:top-[30%] mt-5 p-4 md:p-8 text-white">
          <h1 className="text-3xl lg:text-5xl font-bold  md:max-w-[75%] lg:max-w-[50%] ">
            {title}
          </h1>
          <div className="mt-5 mb-4"></div>
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w-[65%] lg:max-w-[50%]  text-gray-200">
            {truncate(overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMovie;
