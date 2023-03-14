import styles from "./Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import React from "react";
import TransactionForm from "./TransactionForm.js";
import { useCollection } from "../../hooks/useCollection.js";
import TransactionList from "./TransactionList.js";
export default function Home() {
  const { documents, error } = useCollection("transactions");
  const { user } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
