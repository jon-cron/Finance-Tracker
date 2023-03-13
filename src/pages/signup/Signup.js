import styles from "./Signup.module.css";
import React, { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending, error } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 === password) {
      signup(email, password, displayName);
    } else {
      console.log("Password does not match");
      resetForm();
    }
  };
  const resetForm = () => {
    setEmail("");
    setPassword1("");
    setPassword("");
    setDisplayName("");
  };
  return (
    // NOTE since we used the subtraction sign we must format our styles as follows
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Signup</h2>
      <label>
        <span>Email</span>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </label>
      <label>
        <span>Display Name</span>
        <input
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          type="text"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          required
          onChange={(e) => setPassword1(e.target.value)}
          value={password1}
          type="password"
        />
      </label>
      <label>
        <span>Reenter Password</span>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </label>
      {!isPending && <button className="btn">SignUp</button>}
      {error && <p>{error}</p>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
    </form>
  );
}
