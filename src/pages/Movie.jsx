import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import useMovieDetails from "../hooks/useMovieDetails";
import { movieImage } from "../utils/constants";
import MovieSkeleton from "../skeletons/Movie";

import { useDispatch, useSelector } from "react-redux";

import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../store/actions/watchListAction";

import toast from "react-hot-toast";

const Movie = () => {
  const user = useSelector((store) => store.auth.user);
  const watchList = useSelector((store) => store.watchList.movies);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [like, setLike] = useState(false);

  const { id } = useParams();

  const movie = useMovieDetails(id);

  useEffect(() => {
    watchList.forEach((ele) => {
      if (ele.id === Number(id)) {
        setLike(true);
        return;
      }
    });
  }, [watchList, id]);

  if (!user) {
    toast.error("Sign In to continue");
    navigate("/");
    return;
  }

  if (!movie || !watchList) return <MovieSkeleton />;

  const markFavShow = () => {
    const userId = user?.uid;
    if (userId) {
      if (!like) {
        dispatch(addMovieToWatchlist({ movie, userId }));
      } else {
        dispatch(removeMovieFromWatchlist({ movie, userId }));
      }
      setLike(!like);
    }
  };

  return (
    <div className="w-full h-screen bg-black">
      {console.log("Movie Lazy Load")}
      <img
        className="hidden sm:block absolute w-full h-screen object-cover"
        src={movieImage(movie.backdrop_path ?? movie.poster_path, "original")}
        alt="///"
      />
      <div className="fixed top-0 left-0 w-full h-screen md:bg-black/90 bg-black" />
      <div className="absolute w-full h-screen flex items-center justify-center text-white p-5 select-none ">
        <div className="w-full h-screen max-w-6xl mx-auto flex flex-col md:flex-row items-center pt-[20%] md:pt-0">
          <div className=" w-full md:w-1/3">
            <img
              src={movieImage(
                movie.poster_path ?? movie.backdrop_path,
                "original"
              )}
              alt={movie.title}
              className="rounded-lg w-full md:h-auto mx-auto"
              style={{ maxHeight: "24rem", maxWidth: "20rem" }}
            />
          </div>

          <div className="order-1 md:order-2 w-full  md:w-1/2 pt-4 md:pl-8">
            <h2 className="text-lg mb-1 font-bold">
              {movie.title || movie.name}
            </h2>
            {movie.genres && (
              <div className="flex">
                {movie.genres.map((genre) => (
                  <p key={genre.id} className=" text-slate-400 mr-2 mb-2">
                    {genre.name}
                  </p>
                ))}
              </div>
            )}
            <p className="text-lg mb-3">{movie.overview}</p>
            <p className="mb-3 text-slate-400">
              <span className="font-semibold  mr-1">Date Released:</span>
              {movie.release_date || movie.first_air_date}
            </p>
            <div className="flex items-center">
              {like ? (
                <>
                  <TiTick
                    size={20}
                    className="top-2 left-2 text-green-500 cursor-pointer"
                    onClick={markFavShow}
                  />
                  <p>Added</p>
                </>
              ) : (
                <>
                  <IoMdAdd
                    size={20}
                    className="top-2 left-2 text-gray-300 cursor-pointer"
                    onClick={markFavShow}
                  />
                  <p>Watchlist</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
