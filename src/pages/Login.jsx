import React, { useRef, useState } from "react";
import { BG_IMG } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../services/firebase";
import { addUser } from "../store/reducers/userSlice";
import { checkValidData } from "../utils/validate";
import Loading from "../components/Loading";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = useRef("");
  const password = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    if (message) {
      setError(message);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      const { uid, email: userEmail, metadata } = userCredential.user;
      dispatch(
        addUser({
          uid: uid,
          email: userEmail,
          creationTime: metadata?.creationTime,
        })
      );
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full h-screen select-none">
        <img
          className="sm:block absolute w-full h-full object-cover"
          src={BG_IMG}
          alt="///"
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />
        <div className="absolute w-full h-screen  px-4 py-24 z-5">
          <div className="max-w-[350px] md:max-w-[450px] h-[500px] md:h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[220px] md:max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold text-white">Login</h1>

              <form
                className="w-full flex flex-col py-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  ref={email}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                />
                <input
                  ref={password}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                />
                <p className="text-red-500 py-2 text-xs">{error}</p>
                <button
                  onClick={handleAuth}
                  disabled={loading}
                  className="bg-red-600 py-3 my-6 rounded font-bold text-white"
                >
                  {loading ? <Loading /> : "Log In"}
                </button>

                <p className="my-4">
                  <span className="text-gray-600 mr-2">New to Netflix?</span>
                  <Link to={"/signup"} className="text-white">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
