const key = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3/";
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2I5MjNlZDcxMzJmYjYwNTRlODEzMWVhYTI3YWM5MSIsInN1YiI6IjY2MWViYmFkMjBhZjc3MDE3ZDNlMmI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lx_dlDSjWsIQpLxLRQeV4ZqhRxGBcVhSqWrQtDS4tc8",
  },
};

const endpoints = {
  nowPlayingMovies: `${baseUrl}movie/now_playing?api_key=${key}`,
  popular: `${baseUrl}movie/popular?api_key=${key}`,
  topRatedMovies: `${baseUrl}movie/top_rated?api_key=${key}`,
  upcoming: `${baseUrl}movie/upcoming?api_key=${key}`,
};

export const movieDetails = (movie_id) => {
  return `${baseUrl}movie/${movie_id}?api_key=${key}`;
};

export const movieImage = (movie_id) => {
  return `${baseUrl}movie/${movie_id}/images`;
};

export const movieDetailsWithName = (movie) => {
  return `${baseUrl}search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
};

export default endpoints;
