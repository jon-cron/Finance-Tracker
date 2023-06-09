import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuthContext.js";
export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // NOTE email password and displayName are firebase specific for user info
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) {
        throw new Error("Could not signUp");
      }
      await res.user.updateProfile({ displayName });
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    error,
    isPending,
    signup,
  };
}
