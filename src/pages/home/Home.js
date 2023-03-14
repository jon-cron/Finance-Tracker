import styles from "./Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import React from "react";
import TransactionForm from "./TransactionForm.js";
import { useCollection } from "../../hooks/useCollection.js";
import TransactionList from "./TransactionList.js";
export default function Home() {
  const { user } = useAuthContext();
  // NOTE to query a firestore db we must put .where() after the collection with our params
  // NOTE Firestore params are as follows for version 8 .where("value", "relationship", "what we want to find") .where("price", ">", "25")
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
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
