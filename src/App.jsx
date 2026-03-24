import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import NotFoundPage from "./pages/404";
import { Loader } from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { addUser, removeUser } from "./store/reducers/userSlice";
import { removeData } from "./store/reducers/gptSearchSlice";
import { removeWatchList } from "./store/reducers/watchlistSlice";

const LoginComponent = lazy(() => import("./pages/Login"));
const SignupComponent = lazy(() => import("./pages/SignUp"));
const HomeComponent = lazy(() => import("./pages/Home"));
const MovieComponent = lazy(() => import("./pages/Movie"));
const WatchlistComponent = lazy(() => import("./pages/Watchlist"));
const GptSearchComponent = lazy(() => import("./pages/GptSearch"));

function App() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
          })
        );
      } else {
        dispatch(removeUser());
        dispatch(removeData());
        dispatch(removeWatchList());
      }
    });
    return () => authState();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <HomeComponent />
                </Suspense>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? (
                <Suspense fallback={<Loader />}>
                  <LoginComponent />
                </Suspense>
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user ? (
                <Suspense fallback={<Loader />}>
                  <SignupComponent />
                </Suspense>
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/watch/:id"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <MovieComponent />
                </Suspense>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/watchlist"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <WatchlistComponent />
                </Suspense>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/search"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <GptSearchComponent />
                </Suspense>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
