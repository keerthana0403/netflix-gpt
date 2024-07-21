import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import appStore from "./store/appStore";

import HomeSkeleton from "./skeletons/Home";
import MovieSkeleton from "./skeletons/Movie";

import Header from "./components/Header";

const LoginComponent = lazy(() => import("./pages/Login"));
const SignupComponent = lazy(() => import("./pages/SignUp"));
const HomeComponent = lazy(() => import("./pages/Home"));
const MovieComponent = lazy(() => import("./pages/Movie"));
const ProfileComponent = lazy(() => import("./pages/Profile"));
const GptSearchComponent = lazy(() => import("./pages/GptSearch"));

function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <HomeComponent />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<MovieSkeleton />}>
                <LoginComponent />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<MovieSkeleton />}>
                <SignupComponent />
              </Suspense>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <Suspense fallback={<MovieSkeleton />}>
                <MovieComponent />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <ProfileComponent />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <GptSearchComponent />
              </Suspense>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;
