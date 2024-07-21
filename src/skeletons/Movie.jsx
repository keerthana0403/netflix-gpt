import React from "react";

const Movie = () => {
  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="animate-pulse">
        <div className="absolute w-full h-screen flex items-center justify-center p-5 ">
          <div className="w-full h-screen max-w-6xl mx-auto flex flex-col md:flex-row items-center pt-[20%] md:pt-0">
            <div className=" w-1/3 rounded-lg h-[300px] mx-auto bg-gray-800"></div>
            <div className="order-1 md:order-2 w-full  md:w-1/2 pt-4 md:pl-8 sm:m-4">
              <div className="mb-3  h-5 w-[100px] bg-gray-800 "></div>

              <div className="h-5 w-[100px] bg-gray-800 mr-2 mb-2 "></div>

              <div className=" mb-3 h-5 w-[300px] bg-gray-800 "></div>
              <div className=" mb-3 h-5 w-[300px] bg-gray-800 "></div>
              <div className=" mb-3 h-5 w-[300px] bg-gray-800 "></div>
              <div className=" mb-3 h-5 w-[300px] bg-gray-800 "></div>
              <div className=" mb-3 h-5 w-[300px] bg-gray-800 "></div>
              <div className="mb-3 h-5 w-[100px] bg-gray-800 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
