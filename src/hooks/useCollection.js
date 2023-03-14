import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";

export const useCollection = (collection, query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    // NOTE to allow for greater versatility we only query if a query was passed in; if not we get the entire collection
    if (query) {
      ref = ref.where(...query);
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
  }, [collection]);
  return { documents, error };
};
