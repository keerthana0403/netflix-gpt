import { useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/reducers/userSlice";
import { doc, setDoc } from "firebase/firestore";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid, email: userEmail, metadata } = userCredential.user;
      dispatch(
        addUser({
          uid: uid,
          email: userEmail,
          creationTime: metadata?.creationTime,
        })
      );

      await setDoc(doc(db, "users", uid), {
        uid: uid,
        email: userEmail,
        favShows: [],
      });
      toast.success("Account created Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
