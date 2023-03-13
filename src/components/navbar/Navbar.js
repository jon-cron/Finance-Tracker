import styles from "./Navbar.module.css";
import { useLogout } from "../../hooks/useLogout.js";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.js";
export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Finance</li>
        {!user && (
          // NOTE since only one item can be return I surrounded the 2 list items with a fragment
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>hello, {user?.displayName}</li>
            <li>
              <button onClick={logout} className="btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
