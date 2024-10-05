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
import Loading from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { addUser, removeUser } from "./store/reducers/userSlice";
import { removeData } from "./store/reducers/gptSearchSlice";
import { removeWatchList } from "./store/reducers/watchlistSlice";

const LoginComponent = lazy(() => import("./pages/Login"));
const SignupComponent = lazy(() => import("./pages/SignUp"));
const HomeComponent = lazy(() => import("./pages/Home"));
const MovieComponent = lazy(() => import("./pages/Movie"));
const ProfileComponent = lazy(() => import("./pages/Profile"));
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
                <Suspense fallback={<Loading />}>
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
                <Suspense fallback={<Loading />}>
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
                <Suspense fallback={<Loading />}>
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
                <Suspense fallback={<Loading />}>
                  <MovieComponent />
                </Suspense>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Suspense fallback={<Loading />}>
                  <ProfileComponent />
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
                <Suspense fallback={<Loading />}>
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
