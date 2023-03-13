import { useState } from "react";
import { projectAuth } from "../firebase/config.js";
export default useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // NOTE email password and displayName are firebase specific for user info
  const signUp = async (email, password, displayName) => {};
};
