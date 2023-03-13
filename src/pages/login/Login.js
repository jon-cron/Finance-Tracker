import styles from "./Login.module.css";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    // NOTE since we used the subtraction sign we must format our styles as follows
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </label>
      <button className="btn">Login</button>
    </form>
  );
}
