import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import {
  doc,
  // updateDoc,
  // arrayUnion,
  // arrayRemove,
  getDoc,
  runTransaction,
} from "firebase/firestore";

export const getWatchListMovies = createAsyncThunk(
  "getWatchListMovies",
  async (userId) => {
    try {
      if (!userId) throw new Error("User not authenticated");
      const userDoc = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDoc);
      if (userDocSnap.exists()) {
        const watchList = userDocSnap.data().favShows || [];
        return watchList;
      } else {
        console.log("User document does not exist");
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
);

export const addMovieToWatchlist = createAsyncThunk(
  "addMovieToWatchlist",
  async ({ movie, userId }) => {
    try {
      const userDoc = doc(db, "users", userId);
      // await updateDoc(userDoc, {
      //   favShows: arrayUnion({ ...movie }),
      // });
      await runTransaction(db, async (transaction) => {
        const userDocSnap = await transaction.get(userDoc);
        if (!userDocSnap.exists()) {
          throw new Error("User document does not exist");
        }

        const currentWatchlist = userDocSnap.data().favShows || [];
        const isAlreadyInWatchlist = currentWatchlist.some(
          (item) => item.id === movie.id
        );

        if (!isAlreadyInWatchlist) {
          const newWatchlist = [...currentWatchlist, movie];
          transaction.update(userDoc, { favShows: newWatchlist });
        }
      });
      return movie;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const removeMovieFromWatchlist = createAsyncThunk(
  "removeMovieFromWatchlist",
  async ({ movie, userId }) => {
    try {
      const userDoc = doc(db, "users", userId);
      // await updateDoc(userDoc, {
      //   favShows: arrayRemove({ ...movie }),
      // });
      await runTransaction(db, async (transaction) => {
        const userDocSnap = await transaction.get(userDoc);
        if (!userDocSnap.exists()) {
          throw new Error("User document does not exist");
        }

        const currentWatchlist = userDocSnap.data().favShows || [];
        const newWatchlist = currentWatchlist.filter(
          (item) => item.id !== movie.id
        );

        transaction.update(userDoc, { favShows: newWatchlist });
      });
      return movie;
    } catch (error) {
      console.log(error);
    }
  }
);
