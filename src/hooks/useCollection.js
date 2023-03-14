import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config.js";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  // NOTE we are using useRef to avoid an infinite loop with useEffect. useEffect does not like arrays. But if we Reference an array we can get around that cycle
  // NOTE _query is seen as different on every function call but the reference to _query seems the same
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    // NOTE to allow for greater versatility we only query if a query was passed in; if not we get the entire collection
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }
    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error.message);
        setError(error.message);
      }
    );

    return () => unsub();
  }, [collection, query]);
  return { documents, error };
};
