import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../services/firebase";
import { addUser, removeUser } from "../store/reducers/userSlice";

import { Link } from "react-router-dom";
import { removeData } from "../store/reducers/gptSearchSlice";
import { removeWatchList } from "../store/reducers/watchlistSlice";
import Loading from "./Loading";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, metadata } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            creationTime: metadata?.creationTime,
          })
        );
        navigate("/");
      } else {
        dispatch(removeUser());
        dispatch(removeData());
        dispatch(removeWatchList());
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, [dispatch]);

  return (
    <div className="absolute w-full p-4 flex items-center justify-between  bg-gradient-to-b  from-black z-10 select-none">
      <Link to="/">
        <div className=" cursor-pointer ">
          <h1 className="text-red-500 text-3xl lg:text-5xl font-bold">
            NETFLIX
          </h1>
        </div>
      </Link>

      {user ? (
        <div className="flex items-center">
          {location.pathname === "/profile" ? (
            <Link to="/search">
              <button className="capitalize bg-black bg-gradient-to-r from-orange-700 px-4 py-2 mr-2  rounded cursor-pointer border-orange-400 border text-orange-400 font-bold">
                GPT search
              </button>
            </Link>
          ) : (
            <Link to="/profile">
              <button className="capitalize px-4 text-white font-semibold">
                account
              </button>
            </Link>
          )}

          <button
            onClick={handleSignOut}
            disabled={loading}
            className="capitalize  bg-red-600 px-4 py-2 rounded cursor-pointer text-white"
          >
            {loading ? <Loading /> : "Logout"}
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <Link to="/login">
            <button className="capitalize pr-4 text-white font-semibold">
              login
            </button>
          </Link>
          <Link to="/signup">
            <button className="capitalize  bg-red-600 px-4 py-2 rounded cursor-pointer text-white">
              signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
