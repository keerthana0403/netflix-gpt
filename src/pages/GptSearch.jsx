import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import GptSearchBar from "../components/GptSearchBar";
import GptMovieSuggestions from "../components/GptMovieSuggestions";

const GptSearch = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen select-none bg-black">
        <div className="w-full h-[350px] md:h-[450px] select-none ">
          <div className="w-full h-full ">
            <div className="absolute w-full h-[350px] md:h-[450px] bg-black/70 bg-gradient-to-t from-black" />
            <img
              className="w-full h-full  object-cover object-top"
              src="/hero.jpg"
              alt={"///"}
            />
            <div className="absolute w-full top-[1%]  mt-5 p-4 md:p-8 text-white ">
              <button
                className="mt-5 ml-2 p-2 bg-red-500 rounded"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={24} />
              </button>
              <GptSearchBar />
            </div>
          </div>
        </div>
        <div className="w-full  bg-black">
          <GptMovieSuggestions />
        </div>
      </div>
    </>
  );
};

export default GptSearch;
