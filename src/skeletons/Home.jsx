import React from "react";
import MovieList from "./MovieList";

const Home = () => {
  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="animate-pulse">
        <div className="w-full h-[450px] md:h-[550px] bg-gray-800">
          <div className="w-full h-full">
            <div className="absolute w-full top-[10%] md:top-[20%] lg:top-[30%] mt-5 p-4 md:p-8 ">
              <div className="mt-5 mb-4 w-[300px] h-[50px] bg-gray-700 rounded-lg "></div>
              <div className="w-[100px] h-[20px] bg-gray-700 mb-4 rounded-lg"></div>
              <div className="w-full md:max-w-[65%] lg:max-w-[50%] h-[20px] bg-gray-700 rounded-lg mb-2"></div>
              <div className="w-full md:max-w-[65%] lg:max-w-[50%] h-[20px] bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      <MovieList />
    </div>
  );
};

export default Home;
