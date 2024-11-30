import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, Menu, Search } from "lucide-react";

import { auth } from "../services/firebase";
import { Loading } from "./Loading";
import { setContentType } from "../store/reducers/contentType";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigate("/login");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className=" max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 text-white">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => dispatch(setContentType("movie"))}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => dispatch(setContentType("tv"))}
          >
            Tv Shows
          </Link>
          <Link to="/watchlist" className="hover:underline">
            Watchlist
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>

        {loading ? (
          <Loading />
        ) : (
          <LogOut
            className="size-6 cursor-pointer"
            onClick={handleSignOut}
            disabled={loading}
          />
        )}
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              dispatch(setContentType("movie"));
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              dispatch(setContentType("tv"));
            }}
          >
            Tv Shows
          </Link>
          <Link
            to={"/watchlist"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            watchList
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
