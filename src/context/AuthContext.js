import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config.js";
export const AuthContext = createContext();
// NOTE the Reducer is used to change our state
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
  // NOTE this useEffect code checks for the users status upon refresh
  // NOTE setting a function within a useEffect to a const will stop that useEffect from firing again if there is a change that would normally make the useEffect rerun
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);
  console.log("AuthContext state:", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
