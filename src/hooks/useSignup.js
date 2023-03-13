import { useState } from "react";
import { projectAuth } from "../firebase/config.js";
export default function useSignup() {
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
      console.log(res.user);
      if (!res) {
        throw new Error("Could not signUp");
      }
      await res.user.updateProfile({ displayName });
      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };
  return {
    error,
    isPending,
    signup,
  };
}
