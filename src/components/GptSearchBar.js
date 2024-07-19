import React, { useRef, useState } from "react";
import { getGptResult } from "../store/actions/gptSearchAction";

import { useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/gptSearchSlice";
import Loading from "./Loading";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    const text = searchText.current.value;
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = process.env.REACT_APP_OPENAI_APIKEY;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `The user has entered: "${text}"
                    Please provide a list movies. Respond with only the names of the movies in an array format and the list should not have more than 5 movies. Do not include any additional text or explanations.
                    If the input is unclear or unrelated to movies, respond with: "I'm sorry, I couldn't find any relevant movies based on your input. Please try searching with different keywords or phrases related to movies."
                    Examples:
                    Input: "top-rated Tamil movies"
                    Output: ["Movie1", "Movie2", "Movie3"]`,
        },
      ],
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const summary = result;
      const output = summary?.choices[0].message.content.trim();
      console.log(output);
      if (output.startsWith("[") && output.endsWith("]")) {
        const movieList = JSON.parse(output);
        console.log(movieList);
        dispatch(getGptResult(movieList));
      } else {
        dispatch(addMessage(output));
        console.log("No relevant movies found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      dispatch(addMessage("There was an error processing your request."));
    } finally {
      setLoading(false);
    }
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
