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
    const apiKey = import.meta.env.VITE_OPENAI_APIKEY;
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

Analyze the input and determine if the user is asking for:
- Only movies
- Only TV shows/series
- Both

Then provide a list strictly matching that intent. The response should be in the following format:
[
  { "type": "movie", "name": "Movie1" },
  { "type": "tv", "name": "TV Show1" }
]

Rules:
- If the user asks for "series", "shows", "tv shows", or similar → return ONLY items with "type": "tv"
- If the user asks for "movies", "films", or similar → return ONLY items with "type": "movie"
- If the input is generic (e.g. "horror", "romantic") → return a mix of both
- Provide no more than 5 items in total
- Do not include any additional text, explanations, or markdown formatting
- Return raw JSON array only

If the input is unclear or unrelated to movies or TV shows, respond with:
"I'm sorry, I couldn't find any relevant titles based on your input. Please try searching with different keywords or phrases related to movies or TV shows."`,
        },
      ],
    };

    try {
      // ✅ Fetch call was missing — this is what was removed accidentally
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const output = result?.choices[0].message.content.trim(); // ✅ output is now defined

      // ✅ Clean markdown fences GPT sometimes adds
      const cleaned = output.replace(/```json|```/g, "").trim();

      if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
        let movieList = JSON.parse(cleaned);

        // ✅ Safety net: enforce type based on user's keywords
        const lowerText = searchText.toLowerCase();
        if (
          lowerText.includes("series") ||
          lowerText.includes("show") ||
          lowerText.includes("tv")
        ) {
          movieList = movieList.filter((item) => item.type === "tv");
        } else if (lowerText.includes("movie") || lowerText.includes("film")) {
          movieList = movieList.filter((item) => item.type === "movie");
        }

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
