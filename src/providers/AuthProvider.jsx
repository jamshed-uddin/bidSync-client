/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userSignup = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = async () => {
    return signOut(auth);
  };

  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  const resetPasswordEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_baseUrl}/user/generateJwtToken`, {
            email: currentUser?.email,
          })
          .then((res) => {
            localStorage.setItem("jwt", res.data.token);
            setUser(currentUser);
          });
      } else {
        localStorage.removeItem("jwt");
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authOptions = {
    user,
    loading,
    setLoading,
    userSignup,
    userLogin,
    userLogout,
    loginWithGoogle,
    resetPasswordEmail,
  };
  return (
    <AuthContext.Provider value={authOptions}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
