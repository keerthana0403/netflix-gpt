import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/gptSearchSlice";
import { getGptResult } from "../store/actions/gptSearchAction";

const useGptSearch = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const gptSearch = async (searchText) => {
    setLoading(true);

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
          content: `The user has entered: "${searchText}"
                    Please provide a list movies. Respond with only the names of the movies in an array format and the list should not have more than 5 movies. Do not include any additional text or explanations.
                    If the input is unclear or unrelated to movies, respond with: "I'm sorry, I couldn't find any relevant movies based on your input. Please try searching with different keywords or phrases related to movies."
                    Examples:
                    Input: "top-rated Korean movies"
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
      }
    } catch (error) {
      dispatch(addMessage("There was an error processing your request."));
    } finally {
      setLoading(false);
    }
  };
  return { loading, gptSearch };
};

export default useGptSearch;
