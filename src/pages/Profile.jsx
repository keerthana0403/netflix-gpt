import React from "react";
import { useSelector } from "react-redux";

import { BG_IMG } from "../utils/constants";

import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

const Profile = () => {
  const watchList = useSelector((store) => store.watchList.movies);
  const user = useSelector((store) => store.auth.user);

  if (!user || !watchList) return <Loading />;

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <div className="bg-black h-screen w-full select-none text-white ">
        <div className="w-full h-[350px] md:h-[350px] select-none border-b border-slate-500">
          <div className="w-full h-full ">
            <div className="absolute w-full h-[350px] md:h-[350px] bg-black/70 bg-gradient-to-t from-black" />
            <img
              className="w-full h-full object-cover object-top "
              src={BG_IMG}
              alt={"///"}
            />
            <div className="absolute w-full  top-[10%] md:top-[10%] lg:top-[20%] mt-5 p-4 md:p-8 text-white flex m-5">
              <div className="flex items-center justify-center w-24 h-24 bg-red-500 text-white rounded-full text-3xl font-bold">
                {user?.email.charAt(0).toUpperCase()}
              </div>
              <div className="m-5">
                <p className="text-xl font-bold ">{user.email}</p>
                <p className="text-slate-400 font-semibold">
                  {"Member since\t"}
                  {extractDate(user.creationTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-4 text-white px-4 bg-black">
          {watchList.length ? (
            <MovieList title={"watchlist"} movies={watchList} />
          ) : (
            <>
              <h1 className="font-sans font-bold md:text-xl pt-4 pl-4 capitalize">
                Watchlist
              </h1>
              <div className="text-white text-center mt-[10%] md:mt-[5%]">
                <h1 className="text-xl lg:text-3xl font-bold">
                  Your watchlist is empty!
                </h1>
                <p className="text-gray-300 lg:text-xl">
                  Start adding movies to keep track of what you want to watch.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
