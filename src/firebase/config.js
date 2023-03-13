import firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuITTW87u0v3Qk7h9ATjwv4TXvPAT5A5s",
  authDomain: "finance-tracker-7a388.firebaseapp.com",
  projectId: "finance-tracker-7a388",
  storageBucket: "finance-tracker-7a388.appspot.com",
  messagingSenderId: "1079009594757",
  appId: "1:1079009594757:web:ee1a32fae3a54b1e8fc8ec",
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

export { projectFirestore, projectAuth };
