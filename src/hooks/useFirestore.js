import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config.js";

// NOTE making the params dynamic allows for more versatility of the hook

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DOCUMENT":
      return {
        // NOTE we do not need to spread the state because we are changing every piece of state
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        error: null,
        success: false,
      };
    case "ERROR_MESSAGE":
      return {
        error: action.payload,
        isPending: false,
        success: false,
        document: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  // NOTE the first value in the barracks is a banana word. "State" is generally used but we are getting responses back from firestore. Therefore response is an appropriate banana word
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  // NOTE this var is a "reference" to the dynamic collection we are querying
  const ref = projectFirestore.collection(collection);
  // NOTE error handling function
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add
  // NOTE doc is the param set to the hook via the form.
  const addDocument = async (doc) => {
    dispatchIfNotCancelled({ type: "IS_PENDING" });
    try {
      // NOTE how to add a createdAt date to a firestore document
      const createdAt = timestamp.fromDate(new Date());
      // NOTE createAt is a firestore term createdAt: createAt so we only have to write it once
      const addedDocument = await ref.add({ ...doc, createdAt });
      console.log("adding document", addedDocument);
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatch({ type: "ERROR_MESSAGE", payload: error.message });
    }
  };
  //delete
  // NOTE id is the param set to the hook to find the document to delete out of our db.
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR_MESSAGE",
        payload: "Could not delete",
      });
    }
  };
  // NOTE this useEffect function only runs if the page is unmounted. This will stop any requests we make to our db thus stopping any errors
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  // NOTE to export anything place your functions, state, variables here before the last curly boi
  return { addDocument, deleteDocument, response };
};
