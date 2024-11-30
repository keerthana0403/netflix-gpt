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
  nowPlayingMovies: `${baseUrl}movie/now_playing?language=en-US&page=1`,
  popular: `${baseUrl}movie/popular?language=en-US&page=1`,
  topRatedMovies: `${baseUrl}movie/top_rated?language=en-US&page=1`,
  upcoming: `${baseUrl}movie/upcoming?language=en-US&page=1`,
  trending: `${baseUrl}trending/movie/day?language=en-US&page=1`,
};

export const tvEndpoints = {
  airingToday: `${baseUrl}tv/airing_today?language=en-US&page=1`,
  onTheAir: `${baseUrl}tv/on_the_air?language=en-US&page=1`,
  popular: `${baseUrl}tv/popular?language=en-US&page=1`,
  topRated: `${baseUrl}tv/top_rated?language=en-US&page=1`,
  trending: `${baseUrl}trending/tv/day?language=en-US&page=1`,
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
