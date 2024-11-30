import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FixedSizeList } from "react-window";

import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const MovieItem = ({ index, style }) => {
    const movie = movies[index];
    return (
      <Link
        key={movie.id}
        to={"/watch/" + movie.id}
        className="min-w-[250px] relative group"
        style={style}
      >
        <MovieCard movie={movie} />
      </Link>
    );
  };

  return (
    <div
      className="bg-black text-white  px-5 md:px-20 relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        <FixedSizeList
          height={150}
          width={window.innerWidth}
          itemSize={250}
          itemCount={movies.length}
          layout="horizontal"
          outerRef={sliderRef}
          className="scrollbar-hide"
        >
          {MovieItem}
        </FixedSizeList>
        {/* {movies.map((movie) => (
          <Link
            key={movie.id}
            to={"/watch/" + movie.id}
            className="min-w-[250px] relative group"
          >
            <MovieCard movie={movie} />
          </Link>
        ))} */}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieList;
