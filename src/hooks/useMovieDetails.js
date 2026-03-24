import { useEffect, useState } from "react";

import { movieDetails } from "../services/movieServices";

const useMovieDetails = (contentType, movie_id) => {
  const [movie, setMovie] = useState(null);

  const getMovie = async (contentType, movie_id) => {
    const movieUrl = movieDetails(contentType, movie_id);
    const data = await fetch(movieUrl);
    const json = await data.json();
    const movieData = json;
    setMovie(movieData);
  };
  useEffect(() => {
    getMovie(contentType, movie_id);
  }, [contentType, movie_id]);

  return movie;
};

export default useMovieDetails;
