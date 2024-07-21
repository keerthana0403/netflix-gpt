import React, { useRef } from "react";

import Loading from "./Loading";
import useGptSearch from "../hooks/useGptSearch";
import toast from "react-hot-toast";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const { loading, gptSearch } = useGptSearch();

  const handleSubmit = () => {
    if (!searchText.current.value) {
      toast.error("Please enter a valid Input");
      return;
    }
    gptSearch(searchText.current.value);
  };

  return (
    <div className="pt-[35%] md:pt-[5%] flex justify-center">
      <form
        className="flex items-center w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-2 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search..."
          ref={searchText}
          className="flex-grow p-2 rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-500 text-white p-2 rounded-r-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {loading ? <Loading /> : "Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
