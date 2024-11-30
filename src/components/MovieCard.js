import { movieImage } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const { title, backdrop_path } = movie;

  return (
    <div className="rounded-lg overflow-hidden mx-1">
      {backdrop_path ? (
        <img
          className="transition-transform duration-300 ease-in-out group-hover:scale-125"
          src={movieImage(backdrop_path, "w500")}
          alt={title}
        />
      ) : (
        <img
          className="transition-transform duration-300 ease-in-out group-hover:scale-125 w-[500px] h-[150px]"
          src={movieImage(movie?.poster_path, "original")}
          alt={title}
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-sans font-bold">
          {title || movie.original_name}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
