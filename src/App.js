import { Provider } from "react-redux";

import appStore from "./store/appStore";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Header from "./components/Header";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import GptSearch from "./pages/GptSearch";

function App() {
  return (
    <Provider store={appStore}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<GptSearch />} />
      </Routes>
    </Provider>
  );
}

export default App;
