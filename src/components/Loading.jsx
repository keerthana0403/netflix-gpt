import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <img src="loader.svg" alt="Loading..." width={25} height={25} />
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <img src="loader.svg" alt="Loading..." width={25} height={25} />
    </div>
  );
};

export { Loading, Loader };
