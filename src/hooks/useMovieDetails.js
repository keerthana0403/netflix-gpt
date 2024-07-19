import { useEffect, useState } from "react";

import { movieDetails } from "../services/movieServices";

const useMovieDetails = (movie_id) => {
  const [movie, setMovie] = useState(null);

  const getMovie = async (movie_id) => {
    const movieUrl = movieDetails(movie_id);
    const data = await fetch(movieUrl);
    const json = await data.json();
    const movieData = json;
    setMovie(movieData);
  };
  useEffect(() => {
    getMovie(movie_id);
  }, []);

  return movie;
};

export default useMovieDetails;
