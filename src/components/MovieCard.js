import { movieImage } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const { title, backdrop_path, poster_path } = movie;

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden  m-2 select-none">
      {backdrop_path && (
        <img
          className="w-full h-full block object-cover object-top"
          src={movieImage(backdrop_path, "w500")}
          alt={title}
        />
      )}

      {!backdrop_path && (
        <img
          className="w-[200px] h-[90px] sm:h-[110px] md:h-[135px] md:w-[240px] lg:h-[150px] lg:w-[280px] block object-cover object-top"
          src={movieImage(poster_path, "w500")}
          alt={title}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-sans font-bold">
          {movie.title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
