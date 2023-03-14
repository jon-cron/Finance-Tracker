import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore.js";
export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  // NOTE if a collection does not exist then firestore will create the collection with the name you send
  const { addDocument } = useFirestore("transactions");
  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE pass your data as an object
    addDocument({ uid, name, amount });
    resetForm();
  };
  const resetForm = () => {
    setAmount("");
    setName("");
  };
  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Transaction amount:</span>
          <input
            required
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}
