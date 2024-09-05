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

export const endpoints = {
  nowPlayingMovies: `${baseUrl}movie/now_playing?api_key=${key}`,
  popular: `${baseUrl}movie/popular?api_key=${key}`,
  topRatedMovies: `${baseUrl}movie/top_rated?api_key=${key}`,
  upcoming: `${baseUrl}movie/upcoming?api_key=${key}`,
  trending: `${baseUrl}trending/movie/day?api_key=${key}`,
};

export const tvEndpoints = {
  airingToday: `${baseUrl}tv/airing_today?api_key=${key}`,
  onTheAir: `${baseUrl}tv/on_the_air?api_key=${key}`,
  popular: `${baseUrl}tv/popular?api_key=${key}`,
  topRated: `${baseUrl}tv/top_rated?api_key=${key}`,
  trending: `${baseUrl}trending/tv/day?api_key=${key}`,
};

export const movieDetails = (contentType, id) => {
  return `${baseUrl}${contentType}/${id}?api_key=${key}`;
};

export const movieImage = (id) => {
  return `${baseUrl}movie/${id}/images?api_key=${key}`;
};

export const movieDetailsWithName = (contentType, movie) => {
  return `${baseUrl}search/${contentType}?query=${movie}&include_adult=false&language=en-US&page=1`;
};

export const movieTrailers = (contentType, id) => {
  return `${baseUrl}${contentType}/${id}/videos?api_key=${key}`;
};

export const similarContent = (contentType, id) => {
  return `${baseUrl}${contentType}/${id}/similar?api_key=${key}`;
};
