import React, { useState } from "react";

import { Link } from "react-router-dom";

import { checkValidData } from "../utils/validate";

import Loading from "../components/Loading";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, signup } = useSignup();

  const handleAuth = async () => {
    setError("");
    const message = checkValidData(email, password);

    if (message) {
      setError(message);
      return;
    }

    signup(email, password);
  };

  return (
    <div className="h-screen w-full bg-black">
      <img
        className="sm:block absolute w-full h-full object-cover"
        src="/hero.jpg"
        alt="bg_img"
      />
      <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />
      <div className="absolute justify-center items-center h-screen w-full">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to={"/"}>
            <img src="/netflix-logo.png" alt="logo" className="w-32 sm:w-40" />
          </Link>
        </header>

        <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              Sign Up
            </h1>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="you@example.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-red-500 py-2 text-xs">{error}</p>

              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						"
                disabled={loading}
                onClick={handleAuth}
              >
                {loading ? <Loading /> : "Sign Up"}
              </button>
            </form>
            <div className="text-center text-gray-400">
              Already have an account?{" "}
              <Link to={"/login"} className="text-red-500 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
