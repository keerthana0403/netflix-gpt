import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const MovieList = ({ title, movies }) => {
  const [showButtons, setShowButtons] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider.scrollWidth > slider.clientWidth) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [movies]);

  const slide = (offset) => {
    const slider = sliderRef.current;
    slider.scrollLeft += offset;
  };

  return (
    <div className="text-white select-none">
      <h1 className="font-sans font-bold md:text-xl p-4 capitalize">{title}</h1>
      <div className="relative flex items-center group">
        {showButtons && (
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={30}
          />
        )}
        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <Link key={movie.id} to={"/movie/" + movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
        {showButtons && (
          <MdChevronRight
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={30}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
