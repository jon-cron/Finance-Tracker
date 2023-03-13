import styles from "./Navbar.module.css";
import { useLogout } from "../../hooks/useLogout.js";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useLogout();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Finance</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button onClick={logout} className="btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
