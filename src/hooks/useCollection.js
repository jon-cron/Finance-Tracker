import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
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
