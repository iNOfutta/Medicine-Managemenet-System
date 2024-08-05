import axios from "axios";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useContext, useEffect, useState, createContext } from "react";

const AuthContext = createContext({});
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return axios.post("api/User/loginUser", {
      email,
      password,
    });
    //return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (currentUser) {
      // After signing out, remove the user from the state
      setCurrentUser(null); // Set the current user to null or an empty object depending on your state management strategy
      // Remove the user from local storage
      localStorage.removeItem("currentUser");
    }

    //return currentUser && signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function update_email(email) {
    return updateEmail(currentUser, email);
  }

  function update_password(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // check
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    resetPassword,
    update_email,
    update_password,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
