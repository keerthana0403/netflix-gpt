import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeSkeleton from "../skeletons/Home";
import Header from "../components/Header";
import { Trash } from "lucide-react";
import { movieImage } from "../utils/constants";
import {
  getWatchListMovies,
  removeMovieFromWatchlist,
} from "../store/actions/watchListAction";
import { Link } from "react-router-dom";
import { setContentType } from "../store/reducers/contentType";

const Profile = () => {
  const dispatch = useDispatch();
  const watchList = useSelector((store) => store.watchList.movies);
  const userId = useSelector((store) => store.auth.user.uid);

  useEffect(() => {
    dispatch(getWatchListMovies(userId));
  }, [dispatch, userId, watchList]);

  if (!userId || !watchList) return <HomeSkeleton />;

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Watchlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {watchList.length > 0 &&
            watchList?.map((movie) => (
              <Link
                key={movie.id}
                to={"/watch/" + movie.id}
                onClick={() => dispatch(setContentType(movie.contentType))}
              >
                <div
                  key={movie?.id}
                  className="bg-gray-800 p-4 rounded flex items-start hover:bg-gray-700 justify-between"
                >
                  <div className="max-w-[150px] relative group">
                    <img
                      src={movieImage(movie?.backdrop_path, "w500")}
                      alt={movie?.title}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <span className="text-white">
                      {movie?.title || movie?.original_name}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {movie.release_date || movie.first_air_date}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {movie.contentType}
                    </span>
                  </div>

                  <Trash
                    className="size-5  cursor-pointer hover:fill-red-600 hover:text-red-600"
                    onClick={() =>
                      dispatch(removeMovieFromWatchlist({ movie, userId }))
                    }
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
