import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2gVxntwj7PXye3tXUFpD9gDmTBEkG7Cg",
  authDomain: "chat-app-3294e.firebaseapp.com",
  projectId: "chat-app-3294e",
  storageBucket: "chat-app-3294e.appspot.com",
  messagingSenderId: "961878983577",
  appId: "1:961878983577:web:f3c1b11e6b7c78f4c20908",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
